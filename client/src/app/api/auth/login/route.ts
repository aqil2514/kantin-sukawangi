import { supabaseAdmin } from "@/lib/server/supabase";
import { signInSchema } from "@/lib/zod";
import { PostgrestError } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response: General.ApiResponse<Auth.Users, PostgrestError | ZodError> = {
    message: "",
  };
  let userData: Auth.Users;

  try {
    //TODO : Next lanjut ke sini
    const { emailOrUsername, password } = await signInSchema.parseAsync(body);

    const isEmail = z.string().email().safeParse(emailOrUsername).success;
    const columnDb = isEmail ? "email" : "username";

    const { data, error } = await supabaseAdmin
      .schema("next_auth")
      .from("users")
      .select()
      .eq(columnDb, emailOrUsername)
      .single();

    if (!data) {
      response.message = "Data user tidak ditemukan";
      return NextResponse.json(response, { status: 404 });
    }

    if (error instanceof PostgrestError) {
      response.message = "Terjadi kesalahan pada server";
      response.errors = error;
      return NextResponse.json(response, { status: 500 });
    }

    console.log(password)

    userData = data;
    if (!userData.password) {
      response.message = "Pengguna belum membuat password, mengalihkan...";
      response.data = userData;

      return NextResponse.json(response, { status: 403 });
    }

    response.data = userData;
    response.message = "Berhasil masuk";
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      response.message = "Login gagal karena data tidak sesuai!";
      response.errors = error;
      return NextResponse.json(response, { status: 422 });
    }
  }

  return new Response();
}
