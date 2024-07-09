const Pengeluaran = require("../models/Pengeluaran");
const Kolom = require("../models/Kolom");
const Kategori = require("../models/Kategori");
const upload = require("../config/multer");

// Menampilkan semua data pengeluaran
exports.getAllExpense = async (req, res) => {
  try {
    let resultExpense;
    if (req.session.user.role === "bpmj") {
      resultExpense = await Pengeluaran.findAll(); // Jika role user adalah bpmj, ambil semua data pengeluaran
    } else {
      resultExpense = await Pengeluaran.findAll({where: {username: req.session.user.username}}); // Jika bukan, ambil data pengeluaran milik user tersebut
    }
    res.render("expense/expense", {
      currentRoute: "/pengeluaran",
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      expenseData: resultExpense,
    });
  } catch (err) {
    console.error("Error fetching pengeluaran data:", err);
    res.status(500).send("Server error");
  }
};

// Menampilkan halaman untuk menambahkan pengeluaran
exports.getAddExpense = async (req, res) => {
  try {
    const kolomData = await Kolom.findAll(); // Ambil semua data kolom
    const kategoriData = await Kategori.findAll(); // Ambil semua data kategori
    res.render("expense/addExpense", {kolomData, kategoriData, layout: "layout", showHeader: true, dashboardCss: true, currentRoute: "/pengeluaran"});
  } catch (err) {
    console.error("Error fetching kolom and kategori data:", err);
    res.status(500).send("Server error");
  }
};

// Menambahkan data pengeluaran
exports.postAddExpense = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Server error");
    }

    const {kolom, nominal, kategori, tanggal, keterangan} = req.body;
    const bukti_transaksi = req.file ? req.file.filename : null; // Cek apakah ada file bukti transaksi

    try {
      await Pengeluaran.create({
        kolom,
        nominal,
        kategori,
        tanggal,
        bukti_transaksi,
        keterangan,
        username: req.session.user.username,
      });
      res.redirect("/pengeluaran");
    } catch (err) {
      console.error("Error inserting pengeluaran:", err);
      res.status(500).send("Server error");
    }
  });
};

// Menampilkan halaman untuk mengedit pengeluaran
exports.getEditExpense = async (req, res) => {
  const {id} = req.params;
  const kolomData = await Kolom.findAll(); // Ambil semua data kolom
  const kategoriData = await Kategori.findAll(); // Ambil semua data kategori
  try {
    const expense = await Pengeluaran.findByPk(id); // Ambil data pengeluaran berdasarkan id
    if (!expense) {
      return res.status(404).send("Expense not found");
    }
    res.render("expense/editExpense", {
      kolomData,
      kategoriData,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      expense,
      currentRoute: "/pengeluaran",
    });
  } catch (err) {
    console.error("Error fetching pengeluaran:", err);
    res.status(500).send("Server error");
  }
};

// Mengedit data pengeluaran
exports.postEditExpense = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Server error");
    }

    const {id} = req.params;
    const {kolom, nominal, kategori, tanggal, keterangan} = req.body;
    let bukti_transaksi = req.file ? req.file.filename : null; // Cek apakah ada file bukti transaksi baru

    try {
      const expense = await Pengeluaran.findByPk(id); // Ambil data pengeluaran berdasarkan id
      if (!expense) {
        return res.status(404).send("Expense not found");
      }

      if (!bukti_transaksi) {
        bukti_transaksi = expense.bukti_transaksi; // Pertahankan file gambar yang sudah ada
      }

      await expense.update({
        kolom,
        nominal,
        kategori,
        tanggal,
        bukti_transaksi,
        keterangan,
      });
      res.redirect("/pengeluaran");
    } catch (err) {
      console.error("Error updating pengeluaran:", err);
      res.status(500).send("Server error");
    }
  });
};

// Menghapus data pengeluaran
exports.postDeleteExpense = async (req, res) => {
  const {id} = req.params;
  try {
    const expense = await Pengeluaran.findByPk(id); // Ambil data pengeluaran berdasarkan id
    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    await expense.destroy(); // Hapus data pengeluaran
    res.redirect("/pengeluaran");
  } catch (err) {
    console.error("Error deleting pengeluaran:", err);
    res.status(500).send("Server error");
  }
};
