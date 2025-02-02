import { auth } from "@/auth";
import Admin from "@/components/_pages/Admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (!session)
    return {
      title: "Halaman Tidak Ditemukan",
    };
  const user = session.user as Auth.User;

  if (user.role === "admin") return { title: "Admin" };

  return {
    title: "Halaman Tidak Ditemukan",
  };
}

export default async function AdminPage() {
  const session = await auth();

  if (!session) return notFound();
  const user = session.user as Auth.User;

  if (user.role === "admin") return <Admin />;

  return notFound();
}
