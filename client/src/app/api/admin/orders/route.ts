import { apiKeyGuard, ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response: General.ApiResponse<Transaction.TransactionDb> =
    {} as General.ApiResponse<Transaction.TransactionDb>;
  const url = new URL(req.nextUrl);
  const { searchParams } = url;
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    response.message = "Order ID belum diisi";
    response.code = 400;

    return NextResponse.json(response, { status: response.code });
  }

  try {
    const { data } = await axios.get(`${ksEndpoint}/api/admin/orders`, {
      headers: {
        Authorization: apiKeyGuard,
      },
      params: {
        orderId,
      },
    });

    response.data = data.data;
    response.message = "Data berhasil diambil";
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      response.message = "Terjadi error saat pengambilan data";
      response.errors = error;

      return NextResponse.json(response, { status: 500 });
    }
  }

  return NextResponse.json(response, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const field = body.field || getField(body.oldValue);
  const clientData = {
    oldValue: body.oldValue,
    newValue: body.newValue,
    field,
  };

  try {
    const { data } = await axios.put(
      `${ksEndpoint}/api/admin/orders`,
      clientData,
      {
        headers: {
          Authorization: apiKeyGuard
        }
      }
    );
    console.log(data);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan", error },
      { status: 400 }
    );
  }

  return new Response();
}

const getField = (oldValue: string) => {
  if (oldValue.trim().toLowerCase().startsWith("ORD".toLowerCase())) {
    return "order_id";
  } else {
    return "order_details";
  }
};
