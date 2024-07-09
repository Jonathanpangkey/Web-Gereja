const {Sequelize} = require("sequelize");

// untuk konfigurasi database
const sequelize = new Sequelize("database_gereja", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
