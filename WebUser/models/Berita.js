const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Berita = sequelize.define(
  "Berita",
  {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "berita",
    timestamps: false,
  }
);

module.exports = Berita;
