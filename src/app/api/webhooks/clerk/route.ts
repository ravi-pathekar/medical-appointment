import axios from "axios";
import { headers } from "next/headers";
import { createClerkClient } from "@clerk/backend";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers return Error
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Error: No svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Something went wrong while verifying webhook:", err);
      return new NextResponse("Error occured", {
        status: 400,
      });
    }

    const {
      data: { id },
      type: eventType,
    } = evt;
    
    console.log(`Webhook with Id ${id} and event type is ${eventType}`);
    console.log("Webhook event data", evt.data)

    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });

    if (eventType === "user.created") {
      const {
        id,
        email_addresses: emailAddresses,
        image_url: photo,
        first_name: firstName,
        last_name: lastName,
        phone_numbers: phoneNumbers,
      } = evt.data;

      const createdUser = await axios.post(
        "http://localhost:5000/api/users",
        {
          email: emailAddresses[0].email_address,
          firstName,
          lastName,
          photo,
          phone: phoneNumbers[0].phone_number,
          clerkAuthId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          mongoId: createdUser.data.data._id,
        },
      });

      return NextResponse.json({ message: "OK", userCreated: true });
    }

    let token: { jwt: string } | null = null;

    if (eventType === "user.updated" || eventType === "user.deleted") {
      const { id: userId } = evt.data;
      const session = await clerkClient.sessions.createSession({
        userId: userId as string,
      });

      if (process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE) {
        token = await clerkClient.sessions.getToken(
          session.id,
          process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE
        );
      }
    }

    // Update user details in the db
    if (eventType === "user.updated") {
      const {
        image_url: photo,
        first_name: firstName,
        last_name: lastName,
        public_metadata: { mongoId },
      } = evt.data;

      await axios.patch(
        `http://localhost:5000/api/users/${mongoId}`,
        {
          firstName,
          lastName,
          photo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.jwt || ""}`,
          },
        }
      );

      return NextResponse.json({ message: "OK", userUpdated: true });
    }

    // Delete the user from database
    if (eventType === "user.deleted") {
      return NextResponse.json({ message: "OK", userDeleted: true });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Something went wrong in webhook", { status: 400 });
  }
}
