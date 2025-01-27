/* eslint-disable @typescript-eslint/no-unused-vars */

/** Interface yang digunakan secara umum */
namespace General {
  // Interface untuk Response API secara umum
  export interface ApiResponse<T = unknown, E = unknown> {
    /**
     * Status dari permintaan API
     * Contoh: "success", "error"
     */
    status?: "success" | "error";

    /**
     * Pesan yang menjelaskan hasil dari request API.
     * Contoh: "Request berhasil", "Data tidak ditemukan", dll.
     */
    message: string;

    /**
     * Data yang dikembalikan oleh API (jika ada).
     * Tipe data ini dapat disesuaikan dengan tipe data dari setiap endpoint.
     * @example { user: { name: 'John Doe' } }
     */
    data?: T;

    /**
     * Data error yang dikembalikan oleh API
     */
    errors?: E;

    /**
     * Kode status HTTP dari permintaan.
     * Contoh: 200 untuk sukses, 404 untuk tidak ditemukan, 500 untuk server error, dll.
     */
    code?: number;
  }

  export interface CartGetApiResponse {
    redirect_url: string;
    status: Transaction.TransactionStatus;
    statusMessage: string;
    cart_items: General.CartItem[]
  }

  export interface CartItem {
    id: string; // ID produk, bisa berupa string atau number
    name: string; // Nama produk
    price: number; // Harga produk
    quantity: number; // Jumlah produk yang ditambahkan ke keranjang
    imageUrl?: string; // (Opsional) URL gambar produk
  }

  /**Representasi dari kesalahan validasi, berisi jalur properti dan pesan kesalahan.*/
  export interface ValidationError {
    /**
     * Jalur properti yang menyebabkan kesalahan validasi.
     * Jalur ini berupa string yang merepresentasikan lokasi properti,
     * misalnya: `customer_details.email`.
     */
    path: string;

    /**
     * Pesan kesalahan yang menjelaskan mengapa validasi gagal untuk properti tersebut.
     */
    message: string;
  }

  /** Interface untuk atribut link yang digunakan pada elemen a. */
  export interface LinkAttributes {
    /**
     * URL tujuan dari link.
     * Contoh: "https://example.com"
     */
    href: string;

    /**
     * Target tempat link akan dibuka.
     * - "_self": Membuka link di jendela/tab yang sama (default).
     * - "_blank": Membuka link di jendela/tab baru.
     * - "_parent": Membuka link di parent frame.
     * - "_top": Membuka link di frame terluar.
     */
    target?: "_self" | "_blank" | "_parent" | "_top";

    /**
     * Relasi antara halaman saat ini dan halaman yang dituju.
     * Contoh:
     * - "noopener noreferrer" untuk alasan keamanan.
     * - "nofollow" untuk SEO.
     */
    rel?: string;

    /**
     * Teks yang ditampilkan sebagai isi link.
     * Contoh: "Klik di sini"
     */
    text?: string;
  }

  export interface SortOption {
    /** Nama kategori sortir (misalnya: "Harga", "Abjad", "Ketersediaan") */
    label?: string;
    /** Nilai yang digunakan untuk menentukan jenis sortir (misalnya: "harga", "abjad", "ketersediaan") */
    value: "harga" | "abjad" | "ketersediaan";
    /** Urutan sortir, bisa 'asc' untuk ascending atau 'desc' untuk descending */
    order: "asc" | "desc";
  }
}
