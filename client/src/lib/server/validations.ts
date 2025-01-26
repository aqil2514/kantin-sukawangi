import { z } from "zod";

export const validator = {
  CheckoutPost: (data: Transaction.TransactionRequestBody) =>
    parseCheckoutPostData(data),
};

// Checkout Endpoint Validator

// <<<<< Parse >>>>>

const parseCheckoutPostData = (
  data: Transaction.TransactionRequestBody
): {
  success: boolean;
  data?: Transaction.TransactionRequestBody;
  errors?: General.ValidationError[]; // Mengubah format error
} => {
  try {
    // Coba parse data menggunakan schema
    const parsedData = checkoutPostSchema.parse(data);

    // Jika berhasil, kembalikan objek sukses
    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    // Tangkap kesalahan Zod dan format ulang error menjadi array of object
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((issue) => ({
        path: issue.path.join("."), // Gabungkan path array menjadi string
        message: issue.message, // Pesan kesalahan
      }));

      return {
        success: false,
        errors: formattedErrors,
      };
    }

    // Tangkap kesalahan lain (tidak terduga)
    throw new Error("Unexpected error during validation.");
  }
};

// <<<<< Schema >>>>>

const checkoutPostSchema = z.object({
  gross_amount: z
    .number({ required_error: "Jumlah pembayaran wajib diisi!" })
    .positive("Jumlah pembayaran harus lebih besar dari 0!"),
  order_id: z
    .string({ required_error: "Order ID wajib diisi!" })
    .min(5, "Order ID minimal 5 karakter!"),
  customer_details: z.object({
    email: z
      .string()
      .email("Alamat email tidak valid!")
      .optional()
      .or(z.string().min(0)),
    full_name: z
      .string({ required_error: "Nama lengkap wajib diisi!" })
      .min(3, "Nama lengkap minimal 3 karakter!"),
    phone: z
      .string({ required_error: "Nomor telepon wajib diisi!" })
      .regex(
        /^\+?[0-9]+$/,
        "Nomor telepon harus berupa angka dan dapat dimulai dengan +!"
      ),
  }),
}) satisfies z.ZodType<Transaction.TransactionRequestBody>;
