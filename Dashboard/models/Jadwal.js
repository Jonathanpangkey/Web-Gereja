const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Jadwal = sequelize.define(
  "Jadwal",
  {
    tempat_ibadah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kolom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pemimpin_ibadah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "jadwal",
    timestamps: false,
  }
);

module.exports = Jadwal;
