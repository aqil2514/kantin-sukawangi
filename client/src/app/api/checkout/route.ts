import { NextRequest, NextResponse } from "next/server";
import { TransactionResponse } from "midtrans-client";
import axios, { isAxiosError } from "axios";
import { ksEndpoint } from "@/lib/endpoint";

export async function POST(req: NextRequest) {
  const body: Transaction.TransactionRequestBody = await req.json();

  try {
    const res = await axios.post<General.ApiResponse<TransactionResponse>>(
      `${ksEndpoint}/api/checkout`,
      body
    );

    const response: General.ApiResponse<TransactionResponse> = {
      message: res.data.message,
      data: res.data.data,
    };
    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      const response: General.ApiResponse<null, General.ValidationError> = {
        message: "Validasi data gagal",
        errors: error.response?.data.errors,
      };

      return NextResponse.json(response, { status: 400 });
    }

    const response: General.ApiResponse = {
      message: "Terjadi kesalahan",
      errors: error,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { message: "Parameter orderId tidak ada" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(`${ksEndpoint}/api/checkout`, {
      params: { orderId },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error fetching transaction:", error);

      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.message || "Internal Server Error";

      return NextResponse.json({ message }, { status: statusCode });
    }
  }
}
