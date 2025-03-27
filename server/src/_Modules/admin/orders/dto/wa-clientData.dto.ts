import { z } from 'zod';

export const clientDataSchema = z
  .object({
    orderId: z.string().readonly(),
    oldValue: z.string(),
    newValue: z.string().min(1, 'Data baru wajib diisi'),
    field: z.string(),
  })
  .refine((data) => data.newValue !== data.oldValue, {
    message: 'Data baru tidak boleh sama dengan data lama',
    path: ['newValue'],
  })
  .refine(
    (data) => {
      if (data.field !== 'order_id') return true;

      return data.newValue.startsWith('ORD-');
    },
    {
      message: "Order ID harus diawali dengan 'ORD-' (Dengan huruf besar)",
      path: ['newValue'],
    },
  );

export type ClientData = z.infer<typeof clientDataSchema>;
