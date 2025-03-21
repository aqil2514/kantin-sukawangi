import { auth } from "@/auth";
import Admin from "@/components/_pages/(Admin)/Admin";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (!session)
    return {
      title: "Halaman Tidak Ditemukan",
    };
  const user = session.user as Auth.User;

  if (user.role === "admin") return { title: "Dashboard" };

  return {
    title: "Halaman Tidak Ditemukan",
  };
}

export default async function AdminHomePage() {
  return <Admin />;
}
