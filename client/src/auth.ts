import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { supabaseAdmin } from "./lib/server/supabase";
// import { z } from "zod";
// import { supabaseAdmin } from "./lib/server/supabase";

// TODO : Nanti lanjutin ini. Credential masih belum selesai. Callback kayak ga kepakek
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    // Credentials({
    //   credentials: {
    //     emailOrUsername: {},
    //   },
    //   //@ts-expect-error " ga tau ribet"
    //   authorize: async (
    //     credentials
    //   ): Promise<Auth.Users | undefined | null> => {
    //     const { emailOrUsername } = credentials;

    //     const isEmail = z.string().email().safeParse(emailOrUsername).success;
    //     const columnDb = isEmail ? "email" : "username";

    //     const { data, error } = await supabaseAdmin
    //       .schema("next_auth")
    //       .from("users")
    //       .select("id, email, username, name, image")
    //       .eq(columnDb, emailOrUsername)
    //       .single();

    //     if (error) throw error;

    //     if (!data) {
    //       throw new Error("User not found");
    //     }

    //     return data as Auth.Users;
    //   },
    // }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
  secret: process.env.AUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  callbacks: {
    // Callback untuk menangani JWT
    async jwt({ token, user }) {
      // Jika ada user baru, kita ingin menambahkan role ke token
      if (user) {
        // Ambil data pengguna dari Supabase untuk mengetahui apakah dia admin
        const { data, error } = await supabaseAdmin
          .schema("next_auth")
          .from("users") // Nama tabel pengguna di Supabase
          .select("role") // Mengambil role pengguna
          .eq("email", user.email) // Cocokkan email yang masuk
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        }

        if (data) {
          // Menambahkan role pengguna ke token
          token.role = data.role || "member"; // Default ke "member" jika tidak ada role
        }
      }
      return token;
    },

    // Callback untuk menangani sesi
    async session({ session }) {
      return session;
    },
  },
});
