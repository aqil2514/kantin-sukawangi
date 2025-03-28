import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  redirect("/admin/home")
}
