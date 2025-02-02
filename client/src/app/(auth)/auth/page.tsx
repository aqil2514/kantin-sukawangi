import { auth } from "@/auth";
import Authentication from "@/components/_pages/(Protected)/Auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Autentikasi",
};

export default async function authPage() {
  const session = await auth();
  if(session) redirect("/")
  return <Authentication />;
}
