import Container from "@/components/Layouts/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata:Metadata = {
  title:"Halaman Tidak Ditemukan"
}

export default function NotFound() {
  return (
    <Container
      type="main"
      className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center"
    >
      {/* Gambar 404 */}
      <div className="w-3/4 sm:w-1/2 md:w-1/3">
        <Image
          src="/images/illustration/not-found.png" // Ganti dengan path gambar yang sesuai
          alt="404 - Page Not Found"
          width={500} // Menentukan lebar gambar
          height={500} // Menentukan tinggi gambar
          className="w-full h-auto" // Menjaga agar gambar responsif
        />
      </div>

      {/* Teks */}
      <h1 className="mt-8 text-6xl font-bold text-red-600 animate-pulse">
        404
      </h1>
      <p className="mt-4 text-2xl text-gray-700">Halaman tidak ditemukan</p>
      <p className="mt-2 text-lg text-gray-500">
        Kami tidak dapat menemukan halaman yang Anda cari.
      </p>

      {/* Link kembali ke beranda */}
      <Link
        href="/"
        className="mt-6 text-lg text-blue-500 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg px-6 py-2 border-2 border-blue-500 hover:border-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </Container>
  );
}
