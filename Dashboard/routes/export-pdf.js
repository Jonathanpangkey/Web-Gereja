const express = require("express");
const router = express.Router();
const Pemasukkan = require("../models/Pemasukkan");
const Pengeluaran = require("../models/Pengeluaran");

// route untuk mengeksport pdf
router.get("/api/export", async (req, res) => {
  try {
    const pemasukkan = await Pemasukkan.findAll();
    const pengeluaran = await Pengeluaran.findAll();
    res.json({pemasukkan, pengeluaran});
  } catch (err) {
    console.error("Error fetching financial data:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
