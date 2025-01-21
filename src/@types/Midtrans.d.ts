declare module "midtrans-client" {
  /**
   * Kelas untuk membuat transaksi menggunakan Midtrans.
   */
  export class Snap {
    /**
     * Membuat instansi Snap dengan konfigurasi yang diberikan.
     * @param config Konfigurasi yang dibutuhkan untuk menginisialisasi Snap.
     */
    constructor(config: SnapConfig);

    /**
     * Membuat transaksi dengan parameter yang diberikan.
     * @param parameter Parameter yang dibutuhkan untuk membuat transaksi.
     * @returns Objek `TransactionResponse` yang berisi token transaksi dan URL pengalihan.
     */
    createTransaction(
      parameter: TransactionParameters
    ): Promise<TransactionResponse>;
  }

  /**
   * Konfigurasi untuk instansi Snap.
   */
  export interface SnapConfig {
    /**
     * Menentukan apakah transaksi dilakukan di lingkungan produksi atau sandbox.
     * @example true
     */
    isProduction: boolean;

    /**
     * Kunci server untuk otentikasi dengan Midtrans.
     * @example "your-server-key"
     */
    serverKey: string;

    /**
     * Kunci klien untuk otentikasi (opsional).
     * @example "your-client-key"
     */
    clientKey?: string;
  }

  
  /**
   * Detail alamat untuk penagihan atau pengiriman.
   * Semua properti adalah opsional.
   */
  export interface AddressDetails {
    /**
     * Nama depan untuk alamat (biasanya nama pelanggan).
     * @example "TEST"
     * @maxLength 255
     */
    first_name?: string;

    /**
     * Nama belakang untuk alamat (biasanya nama pelanggan).
     * @example "MIDTRANSER"
     * @maxLength 255
     */
    last_name?: string;

    /**
     * Alamat email untuk alamat ini.
     * @example "test@midtrans.com"
     * @maxLength 255
     */
    email?: string;

    /**
     * Nomor telepon untuk alamat ini.
     * @example "081 2233 44-55"
     * @maxLength 255
     */
    phone?: string;

    /**
     * Alamat lengkap tempat pelanggan tinggal atau tempat pengiriman.
     * @example "Sudirman"
     * @maxLength 255
     */
    address?: string;

    /**
     * Kota tempat pelanggan tinggal atau alamat pengiriman.
     * @example "Jakarta"
     * @maxLength 255
     */
    city?: string;

    /**
     * Kode pos tempat pelanggan tinggal atau alamat pengiriman.
     * @example "12190"
     * @maxLength 255
     */
    postal_code?: string;

    /**
     * Kode negara tempat pelanggan tinggal atau alamat pengiriman.
     * @example "IDN"
     * @maxLength 255
     */
    country_code?: string;
  }

  /**
   * Opsi terkait kartu kredit dalam transaksi.
   */
  export interface CreditCardOptions {
    /**
     * Menentukan apakah transaksi kartu kredit dilindungi (secure).
     * @example true
     */
    secure: boolean;
  }

   /**
   * Detail pelanggan yang terlibat dalam transaksi.
   * Semua properti adalah opsional, karena dapat berbeda-beda tergantung kasus transaksi.
   */
   export interface CustomerDetails {
    /**
     * Nama depan pelanggan.
     * @example "TEST"
     * @maxLength 255
     */
    first_name?: string;

    /**
     * Nama belakang pelanggan.
     * @example "MIDTRANSER"
     * @maxLength 255
     */
    last_name?: string;

    /**
     * Alamat email pelanggan.
     * @example "test@midtrans.com"
     * @maxLength 255
     */
    email?: string;

    /**
     * Nomor telepon pelanggan.
     * @example "+628123456"
     * @maxLength 255
     */
    phone?: string;

    /**
     * Alamat penagihan pelanggan (opsional).
     */
    billing_address?: AddressDetails;

    /**
     * Alamat pengiriman pelanggan (opsional).
     */
    shipping_address?: AddressDetails;
  }

  /**
   * Representasi dari detail item yang ada dalam transaksi.
   */
  export interface ItemDetails {
    /**
     * ID unik untuk item.
     * Ini adalah pengenal item yang dapat digunakan untuk referensi lebih lanjut.
     * @example "ITEM1"
     */
    id?: string;

    /**
     * Harga item dalam satuan integer (tanpa desimal).
     * Ini adalah harga yang dikenakan untuk item.
     * @example 10000
     */
    price: number;

    /**
     * Jumlah item yang dibeli dalam transaksi.
     * Harus lebih dari atau sama dengan 1.
     * @example 1
     */
    quantity: number;

    /**
     * Nama dari item.
     * Nama yang menjelaskan produk atau barang tersebut.
     * @example "Midtrans Bear"
     */
    name: string;

    /**
     * Merek dari item.
     * Nama perusahaan atau produsen item ini.
     * @example "Midtrans"
     */
    brand?: string;

    /**
     * Kategori dari item.
     * Kategori yang menggambarkan jenis atau kategori item.
     * @example "Toys"
     */
    category?: string;

    /**
     * Nama merchant yang menjual item ini.
     * Ini merujuk pada penyedia atau penjual yang menawarkan produk.
     * @example "Midtrans"
     */
    merchant_name?: string;

    /**
     * URL dari halaman produk item di situs merchant.
     * Ini adalah URL yang mengarah ke halaman detail produk di situs web merchant.
     * @example "https://tokobuah.com/apple-fuji"
     */
    url?: string;
  }

  /**
   * Detail transaksi yang akan dibuat.
   */
  export interface TransactionDetails {
    /**
     * ID unik untuk transaksi. ID ini harus berbeda untuk setiap transaksi.
     * @example "ORDER-123456789"
     */
    order_id: string;

    /**
     * Jumlah total yang akan dikenakan untuk transaksi (dalam satuan integer tanpa desimal).
     * @example 100000
     */
    gross_amount: number;
  }

  /**
   * Parameter yang diperlukan untuk membuat transaksi.
   */
  export interface TransactionParameters {
    /**
     * Detail transaksi.
     */
    transaction_details: TransactionDetails;

    /**
     * Opsi kartu kredit (opsional).
     */
    credit_card?: CreditCardOptions;

    /**
     * Detail pelanggan yang terlibat dalam transaksi.
     */
    customer_details: CustomerDetails;

    /**
     * Detail item yang terlibat dalam transaksi (opsional).
     */
    item_details?: ItemDetails[];
  }

  /**
   * Respon dari transaksi yang berhasil dibuat.
   * Berisi token transaksi dan URL pengalihan untuk pembayaran.
   */
  export interface TransactionResponse {
    /**
     * Token yang dapat digunakan untuk menyelesaikan transaksi.
     * @example "abcd1234token"
     */
    token: string;

    /**
     * URL untuk mengarahkan pengguna ke halaman pembayaran.
     * @example "https://payment.midtrans.com/..."
     */
    redirect_url: string;
  }
}
