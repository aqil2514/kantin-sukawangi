import { object, string } from "zod"
 
export const signInSchema = object({
  emailOrUsername: string({ required_error: "Email atau Username diperlukan" })
    .min(1, "Email atau Username diperlukan")
    .max(100, "Email atau Username terlalu panjang"),
  password: string({ required_error: "Password diperlukan" })
    .min(1, "Password diperlukan")
    .min(8, "Password minimal 8 karakter")
    .max(32, "Password maksimal 32 karakter"),
});
