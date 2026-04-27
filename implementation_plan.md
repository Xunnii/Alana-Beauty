# Rencana Implementasi Tahap 5: ERP Internal & Point of Sales (POS)

Karena Anda **tidak membutuhkan fitur belanja *online***, arah pengembangan aplikasi ini menjadi sangat jelas: **Sistem ERP Internal & Mesin Kasir (POS)** untuk mempermudah operasional toko fisik Alana Beauty. 

Menjawab pertanyaan Anda: **Apakah memasukkan data lewat Excel itu bagus?**
**Sangat bagus dan sangat direkomendasikan!** Terutama saat awal pemindahan data, Anda tidak perlu mengetik ratusan produk satu per satu. Anda cukup mengunggah file Excel/CSV, dan ratusan produk akan otomatis masuk ke *database* dalam hitungan detik.

Berikut adalah fitur-fitur yang saya sarankan dan rencana implementasinya untuk melengkapi sistem ini:

## 1. Manajemen SDM (Staff Management)
Fitur untuk Owner mengelola akun karyawan.
- **Daftar Karyawan**: Melihat semua staf.
- **Tambah/Edit Staf**: Membuat akun baru, menentukan *Role* (Pengawas / Kasir), dan menempatkan mereka di Cabang spesifik (Rumbai / Air Dingin).
- **Reset Password**: Jika staf lupa sandi.

## 2. Sistem Kasir Cerdas (Point of Sales / POS)
Ini adalah fitur inti untuk transaksi *offline* di toko. (Menu ini akan tersedia untuk akun Kasir dan Owner).
- **Antarmuka Kasir yang Cepat**: Tampilan *grid* produk atau pencarian cepat dengan *barcode scanner* (opsional via *keyboard input*).
- **Keranjang Belanja (Cart)**: Memasukkan barang yang dibeli pelanggan, mengatur kuantitas, dan menghitung total harga otomatis.
- **Pengurangan Stok Otomatis**: Saat transaksi "Selesai/Dibayar", sistem akan langsung memotong stok di cabang tersebut dan mencatat "Barang Keluar" di riwayat Mutasi Stok.

## 3. Laporan Penjualan & Dashboard *Real-Time*
- **Riwayat Transaksi**: Daftar struk penjualan yang sudah terjadi.
- **Pembaruan Dashboard**: Mengubah grafik "Demo" di halaman depan admin menjadi data penjualan *real-time* dari cabang Rumbai dan Air Dingin, sehingga Owner bisa melihat cabang mana yang paling ramai hari ini.

## 4. Import / Export Excel
- Menggunakan *library* Laravel (seperti `maatwebsite/excel`).
- **Import Produk**: Anda bisa mengunduh *template* Excel yang kami sediakan, mengisinya dengan ratusan data produk baru, lalu mengunggahnya.

---

> [!IMPORTANT]
> ## Persetujuan (User Review Required)
> Tahap 5 ini cukup besar. Jika Anda setuju dengan ide ini, saya menyarankan kita mengerjakannya secara berurutan agar rapi:
> 
> 1. **Fokus Pertama**: Kita buat **Manajemen SDM** dan **Import Excel Produk** terlebih dahulu.
> 2. **Fokus Kedua**: Baru kita bangun **Sistem Kasir (POS)** dan Laporannya.
> 
> Apakah Anda setuju dengan urutan pengerjaan ini? Ataukah Anda ingin saya mendahulukan Sistem Kasirnya? Silakan balas persetujuannya!
