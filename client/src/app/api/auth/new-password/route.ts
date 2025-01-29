import { supabaseAdmin } from "@/lib/server/supabase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z, ZodError } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response: General.ApiResponse = { message: "" };

  try {
    const { email, password } = await schema.parseAsync(body);


    // Validasi input (Pastikan email & password ada)
    if (!email || !password) {
      response.message = "Email dan password harus diisi";
      return NextResponse.json(response, { status: 400 });
    }

    // Ambil user berdasarkan email
    const { data, error } = await supabaseAdmin
      .schema("next_auth")
      .from("users")
      .select("password, email") // Ambil hanya kolom yang diperlukan
      .eq("email", email)
      .single();

    // Jika terjadi error saat query ke Supabase
    if (error) {
      response.message = "Terjadi kesalahan pada server";
      return NextResponse.json(response, { status: 500 });
    }

    // Jika user tidak ditemukan
    if (!data) {
      response.message = "User tidak ditemukan";
      return NextResponse.json(response, { status: 404 });
    }

    // Jika user sudah memiliki password
    if (data.password) {
      response.message =
        "User sudah memiliki password, silakan login! Jika lupa, gunakan fitur Lupa Password.";
      return NextResponse.json(response, { status: 403 });
    }

    // Hash password baru
    const password_hashed = await bcrypt.hash(password, 10);

    // Update password di database
    const { error: updateError } = await supabaseAdmin
      .schema("next_auth")
      .from("users")
      .update({ password: password_hashed })
      .eq("email", email);

    if (updateError) {
      response.message = "Gagal memperbarui password";
      return NextResponse.json(response, { status: 500 });
    }

    response.message = "Password berhasil diubah";
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      response.message = "Login gagal karena data tidak sesuai!";
      response.errors = error;
      return NextResponse.json(response, { status: 422 });
    }
  }
}

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "Password tidak sesuai dengan yang diharapkan",
      });
    }
  });
