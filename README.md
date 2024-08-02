# Web Gereja
Website manajemen gereja. Proyek ini terdiri dari dua bagian utama:

1. **Web Dashboard**: 
   - **Fungsi**: Untuk pengelolaan data gereja, termasuk pengeluaran, pendapatan, kolom (kelompok gereja), kategori, berita, dan jadwal.
   - **Fitur**:
     - **Pengeluaran & Pendapatan**: Menambahkan, mengedit, dan menghapus data pengeluaran dan pendapatan. Data kolom dan kategori diinput melalui form dan ditampilkan sebagai dropdown dinamis.
     - **Kolom & Kategori**: Menambah, mengedit, dan menghapus kolom serta kategori yang digunakan dalam form input.
     - **Berita**: Menambahkan, mengedit, dan menghapus berita yang akan dipublikasikan.
     - **Jadwal**: Menambahkan, mengedit, dan menghapus jadwal kegiatan gereja.
     - **Import Laporan Keuangan**: Mengimpor laporan keuangan bulanan dalam format PDF.

2. **Web User**:
   - **Fungsi**: Menyediakan landing page sederhana dan informasi yang dipublikasikan dari Web Dashboard.
   - **Fitur**:
     - **Landing Page**: Menampilkan informasi gereja untuk jemaat.
     - **Informasi Publikasi**: Menampilkan berita dan data publikasi yang diambil dari Web Dashboard.
     - **Import Laporan Keuangan**: Opsi untuk mengimpor laporan keuangan.

### Requirements
- Node Js (NPM)
- MySQL (Mysql Workbench, Php my admin dll)

### Instalasi
- clone : `git clone https://github.com/Jonathanpangkey/Web-Gereja.git`
- Buat Database `database_gereja`
#### Di masing-masing aplikasi (Dashboard, WebUser) : 
- Navigasikan ke direktori  :
	- `cd Dashboard` untuk dashboard
	- `cd WebUser` untuk web user
- Install dependency : `npm install`
- Lakukan konfigurasi koneksi database di file config/db.js, update dan sesuaikan dengan konfigurasi device anda. <br>
`const sequelize = new Sequelize("database_gereja", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});
`
### Menjalankan Aplikasi
- Buka dua terminal dan ke directory masing-masing aplikasi.
- Jalankan masing-masing aplikasi dengan perintah : `node app`
- Dashboard akan berjalan di port 3000, Web User akan berjalan di port 4000.
