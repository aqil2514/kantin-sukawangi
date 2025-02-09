import { z } from 'zod';

export const TransactionDbWaClientDataSchema = z.object({
  additional_message: z.string().optional(),
  amount: z.number().min(0, 'Total transaksi tidak valid'),
  created_at: z.string().min(1, 'Tanggal transaksi harus diisi'),
  order_details: z
    .object({
      customer_details: z.object({
        full_name: z.string().min(1, 'Nama pelanggan harus diisi'),
      }),
      items: z
        .array(
          z.object({
            name: z.string().min(1, 'Nama produk harus diisi'),
            price: z.number().min(0, 'Harga tidak valid'),
            quantity: z.number().min(1, 'Jumlah harus minimal 1'),
          }),
        )
        .nonempty('Minimal 1 produk harus dipesan'),
    })
    .optional(),
});
