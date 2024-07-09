const Pemasukkan = require("../models/Pemasukkan");
const Pengeluaran = require("../models/Pengeluaran");

// Menampilkan halaman beranda
exports.getBeranda = async (req, res) => {
  const resultIncome = await Pemasukkan.findAll(); // Ambil semua data pemasukan
  const resultExpense = await Pengeluaran.findAll(); // Ambil semua data pengeluaran
  const totalIncome = resultIncome.reduce((sum, income) => sum + parseFloat(income.nominal), 0); // Hitung total pemasukan
  const totalExpense = resultExpense.reduce((sum, expense) => sum + parseFloat(expense.nominal), 0); // Hitung total pengeluaran

  res.render("beranda", {
    currentRoute: "/",
    layout: "layout",
    showHeader: true,
    dashboardCss: true,
    totalIncome,
    totalExpense,
  });
};
