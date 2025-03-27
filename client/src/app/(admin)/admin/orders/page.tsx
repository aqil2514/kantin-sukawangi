import { auth } from "@/auth";
import Order from "@/components/_pages/(Admin)/Admin/orders";
import OrderError from "@/components/_pages/(Admin)/Admin/orders/components/UX/Errors";
import OrderProvider from "@/components/_pages/(Admin)/Admin/orders/Providers";
import OrderSuspense from "@/components/_pages/(Admin)/Admin/orders/components/UX/Suspense";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

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
  try {
    const host = (await headers()).get("host");
    const baseUrl = `http://${host}`;
    const res = await fetch(`${baseUrl}/api/transaction`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil data: ${res.status} ${res.statusText}`);
    }

    const { data } = await res.json();

    return (
      <Suspense fallback={<OrderSuspense />}>
        <OrderProvider transactionData={data}>
          <Order />
        </OrderProvider>
      </Suspense>
    );
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
    return <OrderError />;
  }
}
