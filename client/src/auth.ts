import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { supabaseAdmin } from "./lib/server/supabase";

// TODO : Nanti lanjutin ini. Credential harus nyambung ke adapter
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        redirectTo: {},
        user: {},
        password: {},
        csrfToken: {},
        callbackUrl: {},
      },
      authorize: async () => {
        const user = {};
        const db = await supabaseAdmin
          .schema("next_auth")
          .from("users")
          .select()
          .eq("email", "muhamadaqil383@gmail.com")
          .single();

        console.log(db);

        return user;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
});
