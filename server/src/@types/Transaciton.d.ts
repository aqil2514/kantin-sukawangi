namespace Transaction {
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
      phone: string;
    }
  
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
    }
  
    export interface CheckTransactionStatus {
      transaction_id: string;
      transaction_status: string;
      status_message: string;
    }
  }
  