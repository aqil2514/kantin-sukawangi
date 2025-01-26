/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Namespace untuk mendefinisikan tipe-tipe data terkait produk.
 */

namespace Product {
  /**
   * Interface untuk atribut-atribut produk yang digunakan dalam aplikasi.
   */
  export interface ProductAttributes {
    /**
     * ID unik dari produk.
     * @example 1
     */
    id: number;

    /**
     * Nama produk.
     * @example "Nasi Goreng Spesial"
     */
    name: string;

    /**
     * Deskripsi singkat mengenai produk.
     * @example "Nasi goreng dengan bumbu spesial, dilengkapi telur mata sapi dan kerupuk."
     */
    description: string;

    /**
     * Harga produk dalam format angka.
     * @example 25000 // berarti Rp25.000
     */
    price: number;

    /**
     * URL gambar produk yang digunakan untuk ditampilkan.
     * @example "/images/nasi-goreng.jpg"
     */
    imageUrl: string;

    /**
     * Kategori produk, seperti "Main Course", "Snack", atau "Drink".
     * @example "Main Course"
     */
    category: string;

    /**
     * Status ketersediaan produk.
     * @example true // jika produk tersedia
     * @example false // jika produk habis
     */
    isAvailable: boolean;
  }

  /**
   * Context props yang digunakan untuk mengelola data produk dalam aplikasi.
   * @interface ProductsContextProps
   */
  export interface ProductsContextProps {
    /**
     * Daftar produk yang akan ditampilkan dalam aplikasi.
     * @type {Product.ProductAttributes[]}
     */
    initProducts: Product.ProductAttributes[];

    /**
     * Daftar produk yang akan ditampilkan dalam aplikasi.
     * @type {Product.ProductAttributes[]}
     */
    products: Product.ProductAttributes[];

    /**
     * Fungsi untuk memperbarui daftar produk.
     * @type {React.Dispatch<SetStateAction<Product.ProductAttributes[]>>}
     */
    setProducts: React.Dispatch<SetStateAction<Product.ProductAttributes[]>>;
  }

  /**
   * Props untuk provider produk yang digunakan untuk membungkus komponen dan menyediakan akses ke daftar produk.
   * @interface ProductsProviderProps
   */
  export interface ProductsProviderProps {
    /**
     * Komponen anak yang akan dibungkus oleh provider.
     * @type {React.ReactNode}
     */
    children: React.ReactNode;

    /**
     * Daftar produk yang akan digunakan sebagai data sementara. Nantinya, daftar produk ini akan
     * diambil dari server, tetapi untuk saat ini menggunakan data dummy.
     * @type {Product.ProductAttributes[]}
     */
    productsLists: Product.ProductAttributes[];
  }
}
