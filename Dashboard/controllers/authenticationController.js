const {validationResult} = require("express-validator");
const User = require("../models/User");

// Menampilkan halaman login
exports.login = (req, res) => {
  res.render("login", {layout: "layout", errors: []});
};

// Memproses data login
exports.loginPost = async (req, res) => {
  const errors = validationResult(req); // Validasi input
  if (!errors.isEmpty()) {
    return res.render("login", {layout: "layout", errors: errors.array()}); // Tampilkan error jika validasi gagal
  }

  const {username, password} = req.body;

  try {
    const user = await User.findOne({where: {username}}); // Cari user berdasarkan username
    if (!user) {
      return res.render("login", {layout: "layout", errors: [{msg: "Invalid credentials"}]}); // Tampilkan error jika user tidak ditemukan
    }

    // Perbandingan password langsung (sebaiknya menggunakan bcrypt)
    if (password !== user.password) {
      return res.render("login", {layout: "layout", errors: [{msg: "Invalid credentials"}]}); // Tampilkan error jika password salah
    }

    req.session.user = user; // Set sesi user
    res.redirect("/"); // Redirect ke halaman utama
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Proses logout
exports.logout = (req, res) => {
  req.session.destroy(); // Hapus sesi
  res.redirect("/login"); // Redirect ke halaman login
};
