import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { doctorId: string } },
  res: NextResponse
) {
  const { doctorId } = params;
  const response = await axiosInstance.get(`/time-slots/doctor/${doctorId}`);
  const data = response.data.data;
  return NextResponse.json({ data });
}
