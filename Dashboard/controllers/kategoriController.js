const Kategori = require("../models/Kategori");

// Menampilkan semua kategori
exports.getAllKategori = async (req, res) => {
  try {
    const kategoriData = await Kategori.findAll(); // Ambil semua data kategori
    res.render("category/category", {
      kategoriData,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/kategori",
    });
  } catch (err) {
    console.error("Error fetching kategori data:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form tambah kategori
exports.getAddKategori = (req, res) => {
  res.render("category/addCategory", {
    layout: "layout",
    showHeader: true,
    dashboardCss: true,
    currentRoute: "/kategori",
  });
};

// Memproses tambah kategori
exports.postAddKategori = async (req, res) => {
  const { name, type } = req.body;
  try {
    await Kategori.create({ name, type }); // Tambah data kategori
    res.redirect("/kategori"); // Redirect ke halaman kategori
  } catch (err) {
    console.error("Error adding kategori:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form edit kategori
exports.getEditKategori = async (req, res) => {
  const { id } = req.params;
  try {
    const kategori = await Kategori.findByPk(id); // Ambil data kategori berdasarkan ID
    if (!kategori) {
      return res.status(404).send("Kategori not found"); // Tampilkan error jika kategori tidak ditemukan
    }
    res.render("category/editCategory", {
      kategori,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/kategori",
    });
  } catch (err) {
    console.error("Error fetching kategori:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses edit kategori
exports.postEditKategori = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Kategori.update({ name }, { where: { id } }); // Update data kategori berdasarkan ID
    res.redirect("/kategori"); // Redirect ke halaman kategori
  } catch (err) {
    console.error("Error updating kategori:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses hapus kategori
exports.postDeleteKategori = async (req, res) => {
  const { id } = req.params;
  try {
    const kategori = await Kategori.findByPk(id); // Ambil data kategori berdasarkan ID
    if (!kategori) {
      return res.status(404).send("Kategori not found"); // Tampilkan error jika kategori tidak ditemukan
    }
    await kategori.destroy(); // Hapus data kategori
    res.redirect("/kategori"); // Redirect ke halaman kategori
  } catch (err) {
    console.error("Error deleting kategori:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};
