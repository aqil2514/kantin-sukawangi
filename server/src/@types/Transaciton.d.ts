/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Transaction {
  /**
   * @interface CheckTransactionStatus
   * Interface untuk API yang dikembalikan oleh server
   */
  export interface CheckTransactionStatus {
    /** ID Transaksu */
    transaction_id: string;
    /** Status Transaksu */
    transaction_status: Transaction.TransactionStatus;
    /** Pesan dari status transaksi */
    status_message: string;
  }

  /**
   * Merepresentasikan detail pelanggan yang terlibat dalam sebuah transaksi.
   */
  export interface CustomerDetails {
    /**
     * Nama lengkap pelanggan.
     * @example "John Doe"
     */
    full_name: string;

    /**
     * Alamat email pelanggan.
     * @example "john.doe@example.com"
     */
    email?: string;

    /**
     * Nomor telepon pelanggan.
     * @example "08123456789"
     */
    phone?: string;
  }

  /**
   * @interface Item
   * Representasi item produk dalam transaksi.
   */
  export interface Item {
    /**
     * ID produk yang unik.
     */
    product_id: string;

    /**
     * Jumlah produk yang dipesan.
     */
    quantity: number;

    /**
     * Harga per unit produk.
     */
    price: number;
  }

  /**
   * @type TransactionStatus
   * Status transaksi yang memungkinkan.
   */
  export type TransactionStatus =
    | 'nothing' // Tidak ada status apa pun
    | 'pending' // Transaksi menunggu konfirmasi pembayaran.
    | 'settlement' // Transaksi berhasil diselesaikan.
    | 'capture' // Pembayaran telah berhasil ditangkap oleh sistem.
    | 'deny' // Transaksi ditolak.
    | 'cancel' // Transaksi dibatalkan.
    | 'expire' // Transaksi telah kadaluwarsa.
    | 'refund' // Dana transaksi dikembalikan.
    | 'awaiting_payment'; // Menunggu pembayaran dilakukan.

  export interface AllTransactionDb {
      waData: TransactionDbWa[];
      webData: TransactionDb[];
  }

  /**
   * @interface TransactionDb
   * Representasi data transaksi yang disimpan di basis data.
   */
  export interface TransactionDb {
    /**
     * ID pesanan yang unik.
     */
    order_id: string;

    /**
     * ID pengguna yang melakukan transaksi.
     */
    user_id: string;

    /**
     * Total jumlah transaksi.
     */
    amount: number;

    /**
     * Mata uang transaksi, harus terdiri dari 3 karakter (contoh: "IDR").
     */
    currency: string;

    /**
     * Status transaksi saat ini.
     */
    status: TransactionStatus;

    /**
     * Metode pembayaran yang digunakan (contoh: "credit_card", "bank_transfer").
     */
    payment_method: string;

    /**
     * Nama gateway pembayaran yang digunakan.
     */
    payment_gateway: string;

    /**
     * Tanggal transaksi dilakukan (opsional).
     */
    transaction_date?: string;

    /**
     * Tanggal konfirmasi transaksi selesai (opsional).
     */
    confirmation_date?: string;

    /**
     * Rincian pesanan yang mencakup data pelanggan dan daftar item produk (opsional).
     */
    order_details?: OrderDetails;

    /**
     * Referensi eksternal terkait transaksi, jika ada (opsional).
     */
    transaction_reference?: string;

    /**
     * Pesan status tambahan terkait transaksi (opsional).
     */
    status_message?: string;
  }

  export type TransactionDbWa = Pick<
    TransactionDb,
    'order_id' | 'order_details' | 'status' | 'amount'
  > & {
    /** Pesan tambahan dari customer */
    additional_message?: string;
    /** Tanggal pemesanan dibuat */
    created_at: string;
  };

  export type TransactionDbWaClientData = Omit<
    TransactionDbWa,
    'order_id' | 'status'
  >;

  /**
   * Merepresentasikan badan permintaan (request body) yang diperlukan untuk memulai sebuah transaksi.
   */
  export interface TransactionRequestBody {
    /**
     * Identifikasi unik untuk pesanan transaksi.
     * ID ini harus unik untuk setiap transaksi.
     * @example "ORDER-123456789"
     */
    order_id: string;

    /**
     * Jumlah total yang akan ditagih dalam transaksi.
     * @example 100000
     */
    gross_amount: number;

    /**
     * Detail pelanggan yang memulai transaksi.
     * Berisi informasi pribadi seperti nama, email, dan nomor telepon.
     */
    customer_details: CustomerDetails;

    /**
     * Detail barang yang akan dibeli.
     */
    cart_items: General.CartItem[];
  }

  /**
   * @interface OrderDetails
   * Tipe untuk detail pemesanan
   */
  export interface OrderDetails {
    /** Detail customer atau pembeli */
    customer_details: CustomerDetails;
    /** Detail barang yang dibeli */
    items: General.CartItem[];
  }
}
