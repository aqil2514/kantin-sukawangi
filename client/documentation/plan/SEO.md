# Planning SEO untuk Kantin Sukawangi

## 1️⃣ Optimasi Meta Tags (Title, Description, dan Keywords)
### **Tugas:**
- [ ] Gunakan Next.js Metadata API untuk menambahkan **title**, **description**, dan **keywords**.
- [ ] Tambahkan **Open Graph** metadata agar lebih optimal di media sosial.

### **Contoh Implementasi:**
```tsx
export const metadata = {
  title: "Kantin Sukawangi - Pesan Makanan Online",
  description: "Nikmati berbagai menu lezat dari Kantin Sukawangi. Pesan sekarang secara online!",
  keywords: "kantin sukawangi, makanan enak, pesan makanan online, ayam geprek, kopi susu",
  openGraph: {
    title: "Kantin Sukawangi - Pesan Makanan Online",
    description: "Nikmati berbagai menu lezat dari Kantin Sukawangi. Pesan sekarang secara online!",
    url: "https://kantinsukawangi.com",
    type: "website",
    images: [
      {
        url: "https://kantinsukawangi.com/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Kantin Sukawangi",
      },
    ],
  },
};
```

---

## 2️⃣ Menambahkan Struktur Data (Schema.org)
### **Tugas:**
- [ ] Tambahkan **Structured Data JSON-LD** untuk membantu mesin pencari memahami konten situs.

### **Contoh Implementasi:**
```tsx
import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Kantin Sukawangi",
          "image": "https://kantinsukawangi.com/logo.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Sukawangi No. 123",
            "addressLocality": "Bekasi",
            "addressCountry": "ID"
          },
          "servesCuisine": "Indonesian",
          "priceRange": "$",
          "telephone": "+62 812-3456-7890",
          "url": "https://kantinsukawangi.com"
        })
      }} />
    </Head>
  );
}
```

---

## 3️⃣ Meningkatkan Kecepatan Halaman (Core Web Vitals)
### **Tugas:**
- [ ] Gunakan **Lazy Loading** untuk gambar dan iframe (Google Maps, YouTube, dll.).
- [ ] Pastikan gambar dikonversi ke **format WebP** untuk efisiensi loading.
- [ ] Optimalkan **CSS & JavaScript** dengan minifikasi.


---

## 4️⃣ URL yang SEO-Friendly
### **Tugas:**
- [ ] Pastikan slug URL mengandung **kata kunci yang relevan**.
- [ ] Terapkan **Dynamic Routing** di Next.js agar lebih fleksibel.

### **Contoh Implementasi:**
```tsx
// app/menu/[slug]/page.tsx
export default function MenuDetail({ params }: { params: { slug: string } }) {
  return <h1>Menu: {params.slug.replace("-", " ")}</h1>;
}
```

---

## 5️⃣ Sitemap & robots.txt
### **Tugas:**
- [ ] Tambahkan **Sitemap** untuk mempercepat indeks oleh Google.
- [ ] Buat **robots.txt** agar mesin pencari tahu halaman mana yang boleh diindeks.

### **Contoh Implementasi:**
#### **Sitemap (`sitemap.xml.ts`)**:
```tsx
export async function GET() {
  return new Response(`
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://kantinsukawangi.com/</loc>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://kantinsukawangi.com/menu</loc>
        <priority>0.8</priority>
      </url>
    </urlset>
  `, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
```

#### **robots.txt**:
```txt
User-agent: *
Allow: /
Sitemap: https://kantinsukawangi.com/sitemap.xml
```

---

## **Kesimpulan**
✅ Dengan menerapkan langkah-langkah di atas, website **lebih SEO-friendly** dan **mudah ditemukan di Google**.
✅ Meningkatkan pengalaman pengguna dengan **kecepatan dan struktur halaman yang baik**.
✅ Memberikan visibilitas yang lebih luas melalui **Open Graph & Schema.org**.

---

📌 **Langkah Selanjutnya:**
1. Implementasi bertahap setiap poin di atas.
2. Mengukur performa SEO dengan **Google Search Console** dan **PageSpeed Insights**.
3. Meninjau ulang dan mengoptimalkan konten secara berkala.

