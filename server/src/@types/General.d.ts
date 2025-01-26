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
}