import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";

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
      authorize: async (credentials) => {
        const user = {};
        console.log(credentials);

        return user;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
});
