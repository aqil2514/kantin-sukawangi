import { NextRequest } from "next/server";
import { midtrans } from "@/lib/midtrans";
import { TransactionParameters } from "midtrans-client";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body: Transaction.TransactionRequestBody = await req.json();

  const full_name = body.customer_details.full_name.split(" ");
const first_name = full_name[0];
const last_name = full_name.slice(1).join(" ");


  const order_id = randomUUID();

  const parameter: TransactionParameters = {
    transaction_details: {
      order_id,
      gross_amount: body.gross_amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name,
      last_name,
      email: body.customer_details.email,
      phone: body.customer_details.phone,
    },
    item_details:[]
  };

  const test = await midtrans.createTransaction(parameter);
  console.log(test);

  return new Response();
}
