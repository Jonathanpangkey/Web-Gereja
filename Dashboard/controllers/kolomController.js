// Import model yang diperlukan
const Kolom = require('../models/Kolom');

// Menampilkan semua kolom
exports.getAllKolom = async (req, res) => {
  try {
    const kolomData = await Kolom.findAll(); // Ambil semua data kolom
    res.render('kolom/kolom', {
      kolomData,
      layout: 'layout',
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/kolom",
    });
  } catch (err) {
    console.error('Error fetching kolom data:', err);
    res.status(500).send('Server error'); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form tambah kolom
exports.getAddKolom = (req, res) => {
  res.render('kolom/addKolom', {
    layout: 'layout',
    showHeader: true,
    dashboardCss: true,
    currentRoute: "/kolom",
  });
};

// Memproses tambah kolom
exports.postAddKolom = async (req, res) => {
  const { name } = req.body;
  try {
    await Kolom.create({ name }); // Tambah data kolom
    res.redirect('/kolom'); // Redirect ke halaman kolom
  } catch (err) {
    console.error('Error adding kolom:', err);
    res.status(500).send('Server error'); // Tampilkan error jika terjadi masalah server
  }
};

// Menampilkan form edit kolom
exports.getEditKolom = async (req, res) => {
  const { id } = req.params;
  try {
    const kolom = await Kolom.findByPk(id); // Ambil data kolom berdasarkan ID
    if (!kolom) {
      return res.status(404).send('Kolom not found'); // Tampilkan error jika kolom tidak ditemukan
    }
    res.render('kolom/editKolom', {
      kolom,
      layout: 'layout',
      showHeader: true,
      dashboardCss: true,
      currentRoute: "/kolom",
    });
  } catch (err) {
    console.error('Error fetching kolom:', err);
    res.status(500).send('Server error'); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses edit kolom
exports.postEditKolom = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Kolom.update({ name }, { where: { id } }); // Update data kolom berdasarkan ID
    res.redirect('/kolom'); // Redirect ke halaman kolom
  } catch (err) {
    console.error('Error updating kolom:', err);
    res.status(500).send('Server error'); // Tampilkan error jika terjadi masalah server
  }
};

// Memproses hapus kolom
exports.postDeleteKolom = async (req, res) => {
  const { id } = req.params;
  try {
    const kolom = await Kolom.findByPk(id); // Ambil data kolom berdasarkan ID
    if (!kolom) {
      return res.status(404).send('Kolom not found'); // Tampilkan error jika kolom tidak ditemukan
    }
    await kolom.destroy(); // Hapus data kolom
    res.redirect('/kolom'); // Redirect ke halaman kolom
  } catch (err) {
    console.error('Error deleting kolom:', err);
    res.status(500).send('Server error'); // Tampilkan error jika terjadi masalah server
  }
};
