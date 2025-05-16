import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.headers.get("token");
  const response = await axiosInstance.get("/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data.data;
  return NextResponse.json({ data });
}
