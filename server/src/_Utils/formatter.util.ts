import { TransactionParameters } from "midtrans-client";
import { TransactionRequestBodyDto } from "../_Modules/checkout/dto/transaction-request.dto";

export const formatTransactionRequest = (
    body: TransactionRequestBodyDto
  ): TransactionParameters => {
    // Memisahkan full_name menjadi first_name dan last_name
    const full_name = body.customer_details.full_name.split(' ');
    const first_name = full_name[0];
    const last_name = full_name.slice(1).join(' ');
  
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