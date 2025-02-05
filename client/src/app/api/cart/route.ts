import { ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

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

    if (!data.data) throw new Error("Terjadi Kesalahan");

    const response: General.ApiResponse<General.CartGetApiResponse> = {
      message: data.message,
      data: {
        redirect_url,
        status: data.data.status,
        token: data.data.transaction_reference as string,
        statusMessage: data.data.status_message ?? "",
        cart_items: data.data.order_details?.items as General.CartItem[],
        order_id: data.data.order_id,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 404) {
        const response: General.ApiResponse<General.CartGetApiResponse> = {
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
