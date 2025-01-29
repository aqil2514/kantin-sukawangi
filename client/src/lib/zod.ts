import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email diperlukan" })
    .min(1, "Email diperlukan")
    .email("Email tidak valid"),
  password: string({ required_error: "Password Diperlukan" })
    .min(1, "Password Diperlukan")
    .min(8, "Password minimal 8 karakter")
    .max(32, "Password maksimal 32 karakter"),
})