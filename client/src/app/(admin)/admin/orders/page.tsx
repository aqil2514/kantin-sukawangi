import { auth } from "@/auth";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (!session)
    return {
      title: "Halaman Tidak Ditemukan",
    };
  const user = session.user as Auth.User;

  if (user.role === "admin") return { title: "Pesanan" };

  return {
    title: "Halaman Tidak Ditemukan",
  };
}

export default async function AdminOrdersPage() {
  return <div>Order</div>;
}
