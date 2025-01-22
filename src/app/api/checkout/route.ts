import { NextRequest, NextResponse } from "next/server";
import { midtrans } from "@/lib/server/midtrans";
import { TransactionParameters, TransactionResponse } from "midtrans-client";
import { randomUUID } from "crypto";
import { validator } from "@/lib/server/validations";

export async function POST(req: NextRequest) {
  try {
    const body: Transaction.TransactionRequestBody = await req.json();

    body.order_id = randomUUID();

    const validation = validator.CheckoutPost(body);

    if (!validation.success) {
      const response: General.ApiResponse<unknown, General.ValidationError[]> =
        {
          message: "Validasi gagal",
          errors: validation.errors,
        };
      return NextResponse.json(response, { status: 422 });
    }

    const parameter = formatter(body);

    // Membuat transaksi menggunakan Midtrans API
    const midtransResponse = await midtrans.createTransaction(parameter);

    const response: General.ApiResponse<TransactionResponse> = {
      message: "Transaksi berhasil dibuat",
      data: midtransResponse,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Menangani error jika terjadi kegagalan
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Transaction creation failed" },
      { status: 500 }
    );
  }
}

const formatter = (
  body: Transaction.TransactionRequestBody
): TransactionParameters => {
  // Memisahkan full_name menjadi first_name dan last_name
  const full_name = body.customer_details.full_name.split(" ");
  const first_name = full_name[0];
  const last_name = full_name.slice(1).join(" ");

  const order_id = body.order_id;

  // Menyusun parameter transaksi
  const parameter: TransactionParameters = {
    transaction_details: {
      order_id,
      gross_amount: body.gross_amount,
    },
    credit_card: {
      secure: true, // Menjamin bahwa pembayaran menggunakan kartu kredit adalah aman
    },
    customer_details: {
      first_name,
      last_name,
      email: body.customer_details.email,
      phone: body.customer_details.phone,
    },
    item_details: [], // Anda bisa menambahkan detail item di sini
  };

  return parameter;
};
