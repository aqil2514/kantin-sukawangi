import Authentication from "@/components/_pages/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autentikasi",
};

export default async function auth() {
  return <Authentication />;
}
