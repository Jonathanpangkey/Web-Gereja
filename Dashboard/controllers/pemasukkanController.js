const Pemasukkan = require("../models/Pemasukkan");
const Kolom = require("../models/Kolom");
const Kategori = require("../models/Kategori");
const upload = require("../config/multer");

// Menampilkan semua data pemasukkan
exports.getAllIncome = async (req, res) => {
  try {
    let resultIncome;
    if (req.session.user.role === "bpmj") {
      resultIncome = await Pemasukkan.findAll(); // Jika role user adalah bpmj, ambil semua data pemasukkan
    } else {
      resultIncome = await Pemasukkan.findAll({where: {username: req.session.user.username}}); // Jika bukan, ambil data pemasukkan milik user tersebut
    }
    res.render("income/income", {
      currentRoute: "/pemasukkan",
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      incomeData: resultIncome,
    });
  } catch (err) {
    console.error("Error fetching pemasukkan data:", err);
    res.status(500).send("Server error");
  }
};

// Menampilkan halaman untuk menambahkan pemasukkan
exports.getAddIncome = async (req, res) => {
  try {
    const kolomData = await Kolom.findAll(); // Ambil semua data kolom
    const kategoriData = await Kategori.findAll(); // Ambil semua data kategori
    res.render("income/addIncome", {kolomData, kategoriData, layout: "layout", showHeader: true, dashboardCss: true, currentRoute: "/pemasukkan"});
  } catch (err) {
    console.error("Error fetching kolom and kategori data:", err);
    res.status(500).send("Server error");
  }
};

// Menambahkan data pemasukkan
exports.postAddIncome = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Server error");
    }

    const {kolom, nominal, kategori, tanggal, keterangan, nama_jemaat} = req.body;
    const bukti_transaksi = req.file ? req.file.filename : null; // Cek apakah ada file bukti transaksi

    try {
      await Pemasukkan.create({
        kolom,
        nominal,
        kategori,
        nama_jemaat,
        tanggal,
        bukti_transaksi,
        keterangan,
        username: req.session.user.username,
      });
      res.redirect("/pemasukkan");
    } catch (err) {
      console.error("Error inserting pemasukkan:", err);
      res.status(500).send("Server error");
    }
  });
};

// Menampilkan halaman untuk mengedit pemasukkan
exports.getEditIncome = async (req, res) => {
  const {id} = req.params;
  try {
    const income = await Pemasukkan.findByPk(id); // Ambil data pemasukkan berdasarkan id
    const kolomData = await Kolom.findAll(); // Ambil semua data kolom
    const kategoriData = await Kategori.findAll(); // Ambil semua data kategori
    if (!income) {
      return res.status(404).send("Income not found");
    }
    res.render("income/editIncome", {
      layout: "layout",
      kolomData,
      kategoriData,
      showHeader: true,
      dashboardCss: true,
      income,
      currentRoute: "/pemasukkan",
    });
  } catch (err) {
    console.error("Error fetching pemasukkan:", err);
    res.status(500).send("Server error");
  }
};

// Mengedit data pemasukkan
exports.postEditIncome = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Server error");
    }

    const {id} = req.params;
    const {kolom, nominal, kategori, tanggal, keterangan, nama_jemaat} = req.body;
    const bukti_transaksi = req.file ? req.file.filename : null; // Cek apakah ada file bukti transaksi baru

    try {
      const income = await Pemasukkan.findByPk(id); // Ambil data pemasukkan berdasarkan id
      if (!income) {
        return res.status(404).send("Income not found");
      }

      // Jika tidak ada file baru yang diunggah, gunakan bukti_transaksi yang sudah ada
      const updatedData = {
        kolom,
        nominal,
        kategori,
        nama_jemaat,
        tanggal,
        keterangan,
      };
      if (bukti_transaksi) {
        updatedData.bukti_transaksi = bukti_transaksi;
      } else {
        updatedData.bukti_transaksi = income.bukti_transaksi; // Pertahankan file gambar yang sudah ada
      }

      await income.update(updatedData);
      res.redirect("/pemasukkan");
    } catch (err) {
      console.error("Error updating pemasukkan:", err);
      res.status(500).send("Server error");
    }
  });
};

// Menghapus data pemasukkan
exports.postDeleteIncome = async (req, res) => {
  const {id} = req.params;
  try {
    const income = await Pemasukkan.findByPk(id); // Ambil data pemasukkan berdasarkan id
    if (!income) {
      return res.status(404).send("Income not found");
    }

    await income.destroy(); // Hapus data pemasukkan
    res.redirect("/pemasukkan");
  } catch (err) {
    console.error("Error deleting pemasukkan:", err);
    res.status(500).send("Server error");
  }
};
