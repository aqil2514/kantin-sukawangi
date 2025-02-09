import Link from "next/link";
import Container from "@/components/Layouts/Container";
import { Button } from "@/components/ui/button";

export default function Admin() {
  return (
    <Container type="main">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-xl mb-4">Selamat datang, Admin!</p>
      {/* Konten admin lainnya */}
      <div>
        <p>Ini adalah halaman khusus untuk admin.</p>
      </div>
      {/* Tombol yang mengarahkan ke /admin/sanity */}
      <Link href="/admin/sanity" className="block md:hidden" target="_blank">
        <Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Akses Studio
        </Button>
      </Link>
    </Container>
  );
}
