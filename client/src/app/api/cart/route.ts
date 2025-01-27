import { ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// INI BUAT DATABASE DULU, NANTI BARU BISA DISEMPURNAIN

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const { searchParams } = url;
  const token = `${searchParams.get("token")}`;

  try {
    const { data } = await axios.get<
      General.ApiResponse<Transaction.TransactionDb>
    >(`${ksEndpoint}/api/cart`, {
      params: { token },
    });

    const redirect_url = `https://app.sandbox.midtrans.com/snap/v4/redirection/${data.data?.transaction_reference}`;

    const response: General.ApiResponse = {
      message: data.message,
      data: {
        redirect_url,
        status: data.data?.status,
        statusMessage: data.data?.status_message,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 404) {
        const response: General.ApiResponse = {
          message: "Token atau order ID yang dimasukkan tidak valid",
          errors: error,
        };
        return NextResponse.json(response, { status: 404 });
      }
      const response: General.ApiResponse = {
        message: "Terjadi kesalahan pada server",
        errors: error,
      };
      return NextResponse.json(response, { status: 500 });
    }
  }
}
