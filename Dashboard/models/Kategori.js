const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Kategori = sequelize.define("Kategori", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Pemasukkan", "Pengeluaran"),
    allowNull: false,
  },
});

module.exports = Kategori;
