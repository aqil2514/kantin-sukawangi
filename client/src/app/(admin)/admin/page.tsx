"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Cek apakah sesi pengguna sudah ada dan jika role-nya bukan 'admin'
    if (status === "authenticated" && session.user.role !== "admin") {
      // Jika pengguna bukan admin, arahkan ke halaman lain (misalnya beranda)
      router.push("/");
    }
  }, [session, status, router]);

  // Jika sesi belum terdeteksi, tampilkan loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Jika pengguna adalah admin, tampilkan konten halaman admin
  if (session?.user.role === "admin") {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-xl mb-4">Selamat datang, Admin!</p>
        {/* Konten admin lainnya */}
        <div>
          <p>Ini adalah halaman khusus untuk admin.</p>
        </div>
      </div>
    );
  }

  return null; // Jika bukan admin, tidak menampilkan apa-apa (karena sudah di-redirect di useEffect)
};

export default AdminPage;
