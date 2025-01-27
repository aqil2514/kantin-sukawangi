# Dokumentasi Coding

## Sabtu, 25 Januari 2025
- Pembuatan project baru
- Pembuatan direktori `Cart` yang menangani endpoint `/api/cart`

## Minggu, 26 Januari 2025
- Pembuatan Data Transfer Object (DTO) `TransactionRequestBodyDto` melalui `transactionReqestSchema (ZOD)`
- Pembuatan `ZodValidationPipe` untuk validasi data
- Pembuatan utils `formatTransactionRequest` untuk mengubah bentuk data yang dikirim dari klien agar sesuai dengan bentuk data yang diminta oleh Midtrans
- Pembuatan Module `Midtrans` untuk keperluan pembayaran transaksi
- Pembuatan method `createTransaction` pada `checkout service` untuk penanganan generate token dan pembuatan link pembayaran

## Senin, 27 Januari 2025
- Penanganan method GET untuk endpoint `/api/checkout`
- Koneksi ke Supabase DB 