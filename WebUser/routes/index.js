const express = require("express");
const router = express.Router();
const Jadwal = require("../models/Jadwal");
const Berita = require("../models/Berita");
const Pemasukkan = require("../models/Pemasukkan");
const Pengeluaran = require("../models/Pengeluaran");

// Define routes

// Route untuk halaman utama
router.get("/", (req, res) => {
  res.render("index", {layout: "layout", title: "Beranda", currentRoute: "/"});
});

// Route untuk halaman keuangan
router.get("/keuangan", async (req, res) => {
  // mengambil data pemasukkan, pengeluaran
  // mengambil total pemasukkan dan pengeluaran
  // mengambil data total saldo/balance
  const resultIncome = await Pemasukkan.findAll();
  const resultExpense = await Pengeluaran.findAll();
  const totalIncome = resultIncome.reduce((sum, income) => sum + parseFloat(income.nominal), 0);
  const totalExpense = resultExpense.reduce((sum, expense) => sum + parseFloat(expense.nominal), 0);
  const totalBalance = totalIncome - totalExpense;
  res.render("keuangan", {layout: "layout", title: "Keuangan", totalIncome, totalExpense, totalBalance, currentRoute: "/keuangan"});
});

// Route untuk ekspor data keuangan melalui API
router.get("/api/export", async (req, res) => {
  try {
    // mengambil data pemasukkan, pengeluaran
    // mengambil total pemasukkan dan pengeluaran
    const pemasukkan = await Pemasukkan.findAll();
    const pengeluaran = await Pengeluaran.findAll();
    res.json({pemasukkan, pengeluaran});
  } catch (err) {
    console.error("Error fetching financial data:", err);
    res.status(500).send("Server error");
  }
});

// Route untuk halaman jadwal ibadah
router.get("/jadwal", async (req, res) => {
  try {
    // mengambil semua data jadwal
    const jadwals = await Jadwal.findAll({
      order: [["tanggal", "ASC"]], // Order by 'tanggal' in ascending order
    });
    res.render("jadwal", {layout: "layout", title: "Jadwal Ibadah", jadwals, currentRoute: "/jadwal"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route untuk renungan atau berita
router.get("/renungan", async (req, res) => {
  try {
    // mengambil semua data berita
    const beritas = await Berita.findAll({
      order: [["tanggal", "ASC"]], // Order by 'tanggal' in ascending order
    });
    res.render("berita", {layout: "layout", title: "Renungan", beritas, currentRoute: "/renungan"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route untuk detail renungan atau berita
router.get("/renungan/:id", async (req, res) => {
  try {
    // mengambil data berita
    const berita = await Berita.findByPk(req.params.id);
    if (!berita) {
      return res.status(404).send("Berita not found");
    }
    res.render("detailBerita", {layout: "layout", title: berita.judul, berita, currentRoute: "/renungan"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route untuk halaman kontak
router.get("/kontak", (req, res) => {
  res.render("kontak", {layout: "layout", title: "Kontak", currentRoute: "/kontak"});
});

module.exports = router;
