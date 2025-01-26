import { z } from 'zod';

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
});

export type TransactionRequestBodyDto = z.infer<typeof transactionReqestSchema>;
