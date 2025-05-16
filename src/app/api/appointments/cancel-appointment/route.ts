import axiosInstance from "@/utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  console.log("🚀 ~ GET ~ req:", req.body);
  const reqBody = await req.json();
  const { id } = reqBody;
  const token = req.headers.get("token");
  const response = await axiosInstance.patch(
    `/cancel-appointment/${id}`,
    {},
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
