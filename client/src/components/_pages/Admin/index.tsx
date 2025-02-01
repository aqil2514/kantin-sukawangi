import Container from "@/components/Layouts/Container";

export default function Admin() {
  return (
    <Container type="main">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-xl mb-4">Selamat datang, Admin!</p>
      {/* Konten admin lainnya */}
      <div>
        <p>Ini adalah halaman khusus untuk admin.</p>
      </div>
    </Container>
  );
}
