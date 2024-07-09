const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Kolom = sequelize.define('Kolom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Kolom;
