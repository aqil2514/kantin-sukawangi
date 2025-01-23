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
    
    /**
     * Untuk menampilkan order ID demi cek status pesanan.
     * @example "12sdsd-c5x2sq-xcxc"
     */
    token_id: string;
  }

  declare module "midtrans-client" {
    export class CoreApi {
      constructor(config: CoreApiConfig);
  
      transaction: {
        /**
         * Mendapatkan status transaksi berdasarkan Order ID.
         * @param orderId - ID dari pesanan yang ingin diperiksa statusnya.
         */
        status(orderId: string): Promise<TransactionStatusResponse>;
  
        /**
         * Menangani notifikasi transaksi yang dikirimkan melalui webhook Midtrans.
         * @param payload - Data payload yang diterima dari webhook notifikasi Midtrans.
         */
        notification(payload: Record<string, unknown>): Promise<TransactionStatusResponse>;
  
        /**
         * Membatalkan transaksi yang masih aktif berdasarkan Order ID.
         * @param orderId - ID dari pesanan yang ingin dibatalkan.
         */
        cancel(orderId: string): Promise<TransactionCancelResponse>;
  
        /**
         * Menyetujui transaksi kartu kredit yang berstatus challenge.
         * @param orderId - ID dari pesanan yang ingin disetujui.
         */
        approve(orderId: string): Promise<TransactionApproveResponse>;
  
        /**
         * Menolak transaksi kartu kredit yang berstatus challenge.
         * @param orderId - ID dari pesanan yang ingin ditolak.
         */
        deny(orderId: string): Promise<TransactionDenyResponse>;
      };
    }
  
    export interface CoreApiConfig {
      /**
       * Menentukan apakah mode yang digunakan adalah produksi (true) atau sandbox (false).
       */
      isProduction: boolean;
  
      /**
       * Kunci server yang digunakan untuk otentikasi dengan Midtrans.
       */
      serverKey: string;
  
      /**
       * Kunci client opsional yang digunakan untuk beberapa fitur tertentu.
       */
      clientKey?: string;
    }
  
    export interface TransactionStatusResponse {
      /**
       * Kode status dari transaksi.
       */
      status_code: string;
  
      /**
       * Pesan status transaksi.
       */
      status_message: string;
  
      /**
       * ID transaksi yang diberikan oleh Midtrans.
       */
      transaction_id: string;
  
      /**
       * ID pesanan yang digunakan dalam transaksi.
       */
      order_id: string;
  
      /**
       * Jumlah total pembayaran dalam transaksi.
       */
      gross_amount: string;
  
      /**
       * Jenis pembayaran yang digunakan dalam transaksi.
       */
      payment_type: string;
  
      /**
       * Waktu transaksi terjadi.
       */
      transaction_time: string;
  
      /**
       * Status transaksi (misalnya: pending, success, failed).
       */
      transaction_status: string;
  
      /**
       * Status fraud dalam transaksi (misalnya: accept, challenge, deny).
       */
      fraud_status: string;
  
      /**
       * Mata uang yang digunakan dalam transaksi.
       */
      currency: string;
  
      /**
       * Waktu settlement transaksi (jika tersedia).
       */
      settlement_time?: string;
  
      /**
       * Kode persetujuan transaksi (jika tersedia).
       */
      approval_code?: string;
  
      /**
       * Kunci tanda tangan untuk validasi keamanan.
       */
      signature_key: string;
    }
  
    export interface TransactionCancelResponse {
      /**
       * Kode status dari hasil pembatalan.
       */
      status_code: string;
  
      /**
       * Pesan status hasil pembatalan.
       */
      status_message: string;
  
      /**
       * ID pesanan yang dibatalkan.
       */
      order_id: string;
    }
  
    export interface TransactionApproveResponse {
      /**
       * Kode status dari hasil persetujuan.
       */
      status_code: string;
  
      /**
       * Pesan status hasil persetujuan.
       */
      status_message: string;
  
      /**
       * ID pesanan yang disetujui.
       */
      order_id: string;
    }
  
    export interface TransactionDenyResponse {
      /**
       * Kode status dari hasil penolakan.
       */
      status_code: string;
  
      /**
       * Pesan status hasil penolakan.
       */
      status_message: string;
  
      /**
       * ID pesanan yang ditolak.
       */
      order_id: string;
    }
  }
  
}
