import { z } from 'zod';

// export const transactionReqestSchema = z.object({
//   gross_amount: z
//     .number({ required_error: 'Jumlah pembayaran wajib diisi!' })
//     .positive('Jumlah pembayaran harus lebih besar dari 0!'),
//   order_id: z
//     .string({ required_error: 'Order ID wajib diisi!' })
//     .min(5, 'Order ID minimal 5 karakter!')
//     .optional(),
//   customer_details: z.object({
//     email: z
//       .string()
//       .nonempty('Email wajib diisi!')
//       .email('Alamat email tidak valid!'),
//     full_name: z
//       .string({ required_error: 'Nama lengkap wajib diisi!' })
//       .min(3, 'Nama lengkap minimal 3 karakter!'),
//     phone: z
//       .string({ required_error: 'Nomor telepon wajib diisi!' })
//       .regex(
//         /^\+?[0-9]+$/,
//         'Nomor telepon harus berupa angka dan dapat dimulai dengan +!',
//       ),
//   }),
// });

export const transactionReqestSchema = z.object({
  gross_amount: z
    .number({ required_error: 'Jumlah pembayaran wajib diisi!' })
    .positive('Jumlah pembayaran harus lebih besar dari 0!'),
  order_id: z
    .string({ required_error: 'Order ID wajib diisi!' })
    .min(5, 'Order ID minimal 5 karakter!')
    .optional(),
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
  cart_items: z.array(
    z.object({
      id: z.string({ required_error: 'ID produk wajib diisi!' }),
      name: z.string({ required_error: 'Nama produk wajib diisi!' }),
      price: z
        .number({ required_error: 'Harga produk wajib diisi!' })
        .positive('Harga produk harus lebih besar dari 0!'),
      quantity: z
        .number({ required_error: 'Jumlah produk wajib diisi!' })
        .int('Jumlah produk harus berupa bilangan bulat!')
        .positive('Jumlah produk harus lebih besar dari 0!'),
      // imageUrl: z.string().url('URL gambar tidak valid!').optional(),
      imageUrl: z.string(),
    }),
  ).nonempty('Keranjang tidak boleh kosong!'),
});

export type TransactionRequestBodyDto = z.infer<typeof transactionReqestSchema>;
