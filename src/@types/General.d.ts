/* eslint-disable @typescript-eslint/no-unused-vars */

/** Interface yang digunakan secara umum */
namespace General {
  /**
   * Interface untuk atribut link yang digunakan pada elemen <a>.
   */
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
    value: 'harga' | 'abjad' | 'ketersediaan';
    /** Urutan sortir, bisa 'asc' untuk ascending atau 'desc' untuk descending */
    order: 'asc' | 'desc';
  }
  
}
