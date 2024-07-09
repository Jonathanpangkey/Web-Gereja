const Jadwal = require("../models/Jadwal");
const Kolom = require("../models/Kolom");

// Menampilkan semua jadwal
exports.getAllJadwal = async (req, res) => {
  try {
    const jadwalData = await Jadwal.findAll(); // Ambil semua data jadwal
    res.render("schedule/schedule", {
      jadwalData,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/jadwal",
    });
  } catch (err) {
    console.error("Error fetching jadwal data:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form tambah jadwal
exports.getAddJadwal = async (req, res) => {
  const kolomData = await Kolom.findAll(); // Ambil semua data kolom
  res.render("schedule/addSchedule", {
    layout: "layout",
    showHeader: true,
    dashboardCss: true,
    currentRoute: "/jadwal",
    kolomData,
  });
};

// Memproses tambah jadwal
exports.postAddJadwal = async (req, res) => {
  const { tempat_ibadah, kolom, pemimpin_ibadah, tanggal } = req.body;
  try {
    await Jadwal.create({
      tempat_ibadah,
      kolom,
      pemimpin_ibadah,
      tanggal,
    });
    res.redirect("/jadwal"); // Redirect ke halaman jadwal
  } catch (err) {
    console.error("Error adding jadwal:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form edit jadwal
exports.getEditJadwal = async (req, res) => {
  try {
    const kolomData = await Kolom.findAll(); // Ambil semua data kolom
    const jadwal = await Jadwal.findByPk(req.params.id); // Ambil data jadwal berdasarkan ID
    if (!jadwal) {
      return res.status(404).send("Jadwal not found"); // Tampilkan error jika jadwal tidak ditemukan
    }
    res.render("schedule/editSchedule", {
      jadwal,
      layout: "layout",
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/jadwal",
      kolomData,
    });
  } catch (err) {
    console.error("Error fetching jadwal:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses edit jadwal
exports.postEditJadwal = async (req, res) => {
  const { tempat_ibadah, kolom, pemimpin_ibadah, tanggal } = req.body;
  try {
    await Jadwal.update(
      { tempat_ibadah, kolom, pemimpin_ibadah, tanggal },
      { where: { id: req.params.id } }
    ); // Update data jadwal berdasarkan ID
    res.redirect("/jadwal"); // Redirect ke halaman jadwal
  } catch (err) {
    console.error("Error updating jadwal:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses hapus jadwal
exports.postDeleteJadwal = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Jadwal.findByPk(id); // Ambil data jadwal berdasarkan ID
    if (!schedule) {
      return res.status(404).send("Schedule not found"); // Tampilkan error jika jadwal tidak ditemukan
    }
    await schedule.destroy(); // Hapus data jadwal
    res.redirect("/jadwal"); // Redirect ke halaman jadwal
  } catch (err) {
    console.error("Error deleting jadwal:", err);
    res.status(500).send("Server error"); // Tampilkan error jika terjadi masalah server
  }
};
