import { TransactionResponse } from "midtrans-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const { searchParams } = url;
  const token = `${searchParams.get("token")}`;

  if (!token) {
    const response: General.ApiResponse = {
      message: "Token tidak ada",
    };

    return NextResponse.json(response, { status: 400 });
  }

  const redirect_url = `https://app.sandbox.midtrans.com/snap/v4/redirection/${token}`;

  const data: TransactionResponse = {
    token_id: "",
    redirect_url,
    token,
  };

  const response: General.ApiResponse<TransactionResponse> = {
    message: "Berhasil mendapatkan redirect url",
    data,
  };

  return NextResponse.json(response, { status: 200 });
}
