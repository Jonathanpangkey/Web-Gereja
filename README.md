# Web Gereja

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
