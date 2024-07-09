// untuk konfigurasi database
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("database_gereja", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
