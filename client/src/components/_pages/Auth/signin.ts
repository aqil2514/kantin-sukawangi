"use server"
import { signIn } from "@/auth";

export const handleGoogleLogin = async () => {
    await signIn("google");
  };