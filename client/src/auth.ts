import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

// TODO : Nanti lanjutin ini. Credential harus nyambung ke adapter
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   //@ts-expect-error " ga tau ribet"
    //   authorize: async (credentials):Promise<Auth.Users | undefined | null> => {
    //     let userData: Auth.Users;

    //     try {
    //       console.log(credentials)
    //       const validation = await signInSchema.parseAsync(
    //         credentials
    //       );
    //       console.log(validation)


    //       const { data, error } = await supabaseAdmin
    //         .schema("next_auth")
    //         .from("users")
    //         .select()
    //         .eq("email", validation.email)
    //         .single();

    //         console.log(data)

    //       if (!data) {
    //         throw new CredentialsSignin("User tidak ditemukan");
    //       }
    //       if (error) {
    //         throw new Error("Terjadi kesalahan:", error);
    //       }

    //       userData = data;
    //       if(!userData.password) return redirect("/eror")

    //       return userData;
    //     } catch (error) {
    //       if (error instanceof ZodError) {
    //         console.log(error)
    //         return null;
    //       }
    //     }
    //   },
    // }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
});
