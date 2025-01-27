import { TransactionParameters } from 'midtrans-client';
import { TransactionRequestBodyDto } from '../_Modules/checkout/dto/transaction-request.dto';
import { TransactionDbDto } from '../_Modules/checkout/dto/transaction-db.dto';

export const formatTransactionRequest = (
  body: TransactionRequestBodyDto,
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

export const formatTransactionDb = (body: TransactionRequestBodyDto): TransactionDbDto => {
  const result: TransactionDbDto = {
    amount: body.gross_amount,
    user_id: "Public", // Atau Anda bisa menggantinya dengan nilai yang relevan
    order_id: body.order_id,
    transaction_date: new Date().toISOString(), // Gunakan ISO untuk format tanggal yang lebih konsisten
    currency: "IDR", // Bisa disesuaikan jika dibutuhkan
    status: "awaiting_payment", // Status default jika belum dikonfirmasi
    order_details: {
      customer_details: {
        email: body.customer_details.email,
        full_name: body.customer_details.full_name,
        phone: body.customer_details.phone,
      },
      // TODO : Tanganin ini nanti
      items: body.cart_items, // Jika Anda ingin menangani produk, bisa diisi dengan data yang sesuai
    },
    payment_gateway: "Midtrans", // Dapat diganti dengan gateway yang sesuai
    status_message: "Menunggu Pembayaran", // Pesan default status
    transaction_reference: body.order_id, // Referensi transaksi bisa disesuaikan
    payment_method: "credit_card", // Bisa disesuaikan dengan metode pembayaran
    confirmation_date: null, // Bisa dibiarkan null jika belum ada konfirmasi
  };

  return result;
};
