import { z } from 'zod';

// Schema untuk validasi data transaksi
export const CreateTransactionSchema = z.object({
  order_id: z.string().min(1, 'Order ID harus diisi'), // Order ID wajib diisi
  user_id: z.string().uuid('User ID tidak valid'), // User ID harus UUID yang valid
  amount: z.number().positive('Jumlah harus lebih dari 0'), // Jumlah transaksi harus lebih besar dari 0
  currency: z.string().length(3, 'Mata uang harus memiliki 3 karakter'), // Mata uang 3 karakter (contoh: 'IDR')
  status: z.enum(
    ['pending', 'settlement', 'capture', 'deny', 'cancel', 'expire', 'refund'],
    {
      errorMap: () => {
        return { message: 'Status transaksi tidak valid' };
      },
    },
  ), // Status transaksi harus salah satu nilai di atas
  payment_method: z.string().min(1, 'Metode pembayaran harus diisi'), // Metode pembayaran wajib diisi
  payment_gateway: z.string().min(1, 'Payment gateway harus diisi'), // Payment gateway wajib diisi
  transaction_date: z.string().optional(), // Tanggal transaksi opsional
  confirmation_date: z.string().optional(), // Tanggal konfirmasi transaksi opsional
  order_details: z
    .object({
      customer_details: z.object({
        email: z
          .string()
          .nonempty('Email wajib diisi!')
          .email('Alamat email tidak valid!'),
        full_name: z
          .string({ required_error: 'Nama lengkap wajib diisi!' })
          .min(3, 'Nama lengkap minimal 3 karakter!'),
        phone: z
          .string({ required_error: 'Nomor telepon wajib diisi!' })
          .regex(
            /^\+?[0-9]+$/,
            'Nomor telepon harus berupa angka dan dapat dimulai dengan +!',
          ),
      }),
      items: z.array(
        z.object({
          product_id: z.string().uuid('Product ID tidak valid'),
          quantity: z
            .number()
            .positive('Jumlah produk harus lebih besar dari 0'),
          price: z.number().positive('Harga produk harus lebih besar dari 0'),
        }),
      ),
    })
    .optional(), // Rincian pesanan opsional, bisa berisi array item produk
  transaction_reference: z.string().optional(), // Referensi transaksi eksternal
  status_message: z.string().optional(), // Pesan status opsional
});

export const UpdateTransactionSchema = z.object({
  status: z.enum(
    ['pending', 'settlement', 'capture', 'deny', 'cancel', 'expire', 'refund'],
    {
      errorMap: () => {
        return { message: 'Status transaksi tidak valid' };
      },
    },
  ), // Status transaksi untuk pembaruan
  transaction_reference: z.string().optional(), // Referensi transaksi eksternal opsional
  status_message: z.string().optional(), // Pesan status opsional
});

export type TransactionDbDto = z.infer<typeof CreateTransactionSchema>;
