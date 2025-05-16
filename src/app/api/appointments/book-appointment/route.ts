import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  console.log("🚀 ~ POST ~ reqBody:", reqBody)
  const token = req.headers.get("token");
  const response = await axiosInstance.post(
    "/appointments",
    reqBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data.data;
  console.log("🚀 ~ handler ~ data:", data);
  return NextResponse.json({ data: true });
}
