import { auth } from "@/auth";
import AdminProvider from "@/components/_pages/(Admin)/Admin/Provider";
import AdminNavbar from "@/components/Layouts/Navbar/Admin";
import AdminSidebar from "@/components/Layouts/Navbar/Sidebar/Admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user as Auth.User;

  if (!session?.user || user.role !== "admin") return notFound();
// TODO : Lanjutin ini
  return (
    <AdminProvider>
      <AdminNavbar />
      <AdminSidebar />
      {children}
    </AdminProvider>
  );
}
