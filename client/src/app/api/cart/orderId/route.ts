import { ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.API_KEY) {
      return NextResponse.json(
        { message: "API Key tidak ditemukan" },
        { status: 500 }
      );
    }

    const response = await axios.get<General.ApiResponse<{ orderId: string }>>(
      `${ksEndpoint}/api/cart/orderId`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error fetching orderId:", error);
      return NextResponse.json(
        { message: "Gagal mengambil orderId", error: error.message },
        { status: 500 }
      );
    }
  }
}
