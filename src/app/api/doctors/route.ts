import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await axiosInstance.get("/doctors");
  const data = response.data.data;
  return NextResponse.json({ data });
}
