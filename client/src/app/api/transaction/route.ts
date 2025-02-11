import { apiKeyGuard, ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response: General.ApiResponse<Transaction.TransactionDb> =
    {} as General.ApiResponse<Transaction.TransactionDb>;

  try {
    const { data } = await axios.get<
      General.ApiResponse<Transaction.TransactionDb>
    >(`${ksEndpoint}/api/transaction`, {
      headers: {
        Authorization: apiKeyGuard,
      },
    });

    response.data = data.data;
    response.message = data.message;
    response.code = 200;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      if (statusCode === 500) {
        response.message = error.message;
        response.code = statusCode;
      } else {
        response.message = error.message;
        response.code = statusCode;
      }
    }
  }

  return NextResponse.json(response, { status: response.code });
}
