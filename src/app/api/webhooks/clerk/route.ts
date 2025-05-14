import axios from "axios";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { createClerkClient } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });
    const evt = await verifyWebhook(req);
    const {
      data: { id },
      type: eventType,
    } = evt;
    
    console.log(`Webhook with Id ${id} and event type is ${eventType}`);
    console.log("Webhook event data", evt.data)
    // Create user in the db
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
      const session = await clerkClient.sessions.createSession({ userId: userId as string });

      token = await clerkClient.sessions.getToken(
        session.id,
        "medical-appointment-jwt-token"
      );
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

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Something went wrong in webhook", { status: 400 });
  }
}
