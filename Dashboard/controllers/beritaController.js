// Import model yang diperlukan
const Berita = require("../models/Berita");

// Menampilkan semua berita
exports.getAllBerita = async (req, res) => {
  try {
    const beritaData = await Berita.findAll(); // Ambil semua data berita
    res.render("news/news", {
      beritaData,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/berita",
    });
  } catch (err) {
    console.error("Error fetching berita data:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form tambah berita
exports.getAddBerita = (req, res) => {
  res.render("news/addNews", {
    layout: "layout",
    showHeader: true,
    dashboardCss: true,
    currentRoute: "/berita",
  });
};

// Memproses tambah berita
exports.postAddBerita = async (req, res) => {
  const {judul, isi, tanggal} = req.body;
  try {
    await Berita.create({
      judul,
      isi,
      tanggal,
    });
    res.redirect("/berita"); // Redirect ke halaman berita
  } catch (err) {
    console.error("Error adding berita:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form edit berita
exports.getEditBerita = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id); // Ambil data berita berdasarkan ID
    if (!berita) {
      return res.status(404).send("Berita not found"); // Tampilkan error jika berita tidak ditemukan
    }
    res.render("news/editNews", {
      berita,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/berita",
    });
  } catch (err) {
    console.error("Error fetching berita:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses edit berita
exports.postEditBerita = async (req, res) => {
  const {judul, isi, tanggal} = req.body;
  try {
    await Berita.update({judul, isi, tanggal}, {where: {id: req.params.id}}); // Update data berita berdasarkan ID
    res.redirect("/berita"); // Redirect ke halaman berita
  } catch (err) {
    console.error("Error updating berita:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses hapus berita
exports.postDeleteBerita = async (req, res) => {
  const {id} = req.params;
  try {
    const berita = await Berita.findByPk(id); // Ambil data berita berdasarkan ID
    if (!berita) {
      return res.status(404).send("Berita not found"); // Tampilkan error jika berita tidak ditemukan
    }
    await berita.destroy(); // Hapus data berita
    res.redirect("/berita"); // Redirect ke halaman berita
  } catch (err) {
    console.error("Error deleting berita:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};
