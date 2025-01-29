# Dokumentasi Coding

## Jum'at 24 Januari 2025
- Membuat HTTP Method baru (GET) untuk endpoint `/api/checkout` yang bertujuan untuk melihat status transaksi
- Memperbarui komponent `PaymentLink` pada file [WithProducts.tsx](src\components\_pages\Checkout\WithProducts.tsx) => Penambahan CTA cek status transaksi.
- Pembaruan nama Variabel Zustand yang awalnya `useStore` menjadi `useCartStore`.
- Penambahan `persist` pada Zustand agar item yang disimpan tidak hilang ketika refresh
- Pembuatan variabel new Object, `midtransCoreApi`
- Penambahan interface untuk menyesuaikan dengan `midtransCoreApi`
- Pembuatan route `cart`(Keranjang). Masih belum selesai
- Pengubahan interface `CustomerDetails` yang awalnya email itu wajib menjadi opsional
- Pembuatan desain UI awal untuk route `/cart`. Referensi UI https://assets.justinmind.com/wp-content/uploads/2019/10/shopping-cart-design-jimmy-choo.png

## Sabtu 25 Januari 2025
- Pembuatan komponen `Checkout` pada route `/cart`
- Pembuatan komponen `ContinueSection` untuk melanjutkan pembayaran yang telah disimpan Order Tokennya 
- Route `/cart/` sementara sudah jadi
- Pembaruan pada komponen `NavbarCarts`. Penambahan icon agar bisa menuju ke halaman `/cart/`
- Penyesuaian zod type sudah dilakukan pada email, sehingga saat checkout tidak diperlukan email

## Senin, 27 Januari 2025
- Penanganan method GET untuk endpoint `/api/checkout`
- Penanganan method POST untuk endpoint `/api/checkout`
- Peningkatan pada route `/checkout`

## Rabu, 29 Januari 2025
- Pembuatan route baru untuk `/auth`
- Simulasis login pada route `/auth`