import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { id } = reqBody;
  const token = req.headers.get("token");
  const response = await axiosInstance.patch(
    `/appointments/cancel-appointment/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data.data;
  return NextResponse.json({ data: true });
}
