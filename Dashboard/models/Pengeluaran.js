const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Pengeluaran = sequelize.define(
  "Pengeluaran",
  {
    kolom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominal: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    bukti_transaksi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    username: {type: DataTypes.STRING, allowNull: false},
  },
  {
    tableName: "pengeluaran",
    timestamps: false,
  }
);

module.exports = Pengeluaran;
