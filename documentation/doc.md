# Dokumentasi Coding

## Jum'at 24 Januari 2025
- Membuat HTTP Method baru (GET) untuk endpoint `/api/checkout` yang bertujuan untuk melihat status transaksi
- Memperbarui komponent `PaymentLink` pada file [WithProducts.tsx](src\components\_pages\Checkout\WithProducts.tsx) => Penambahan CTA cek status transaksi.
- Pembaruan nama Variabel Zustand yang awalnya `useStore` menjadi `useCartStore`.
- Penambahan `persist` pada Zustand agar item yang disimpan tidak hilang ketika refresh
- Pembuatan variabel new Object, `midtransCoreApi`
- Penambahan interface untuk menyesuaikan dengan `midtransCoreApi`
- Pembuatan route `cart`(Keranjang). Masih belum selesai