// Import module yang diperlukan
const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

// Import router
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const incomeRouter = require("./routes/income");
const expenseRouter = require("./routes/expense");
const jadwalRouter = require("./routes/schedule");
const beritaRouter = require("./routes/news");
const kolomRouter = require("./routes/kolom");
const kategoriRouter = require("./routes/category");
const userRouter = require("./routes/user");
const exportRoutes = require("./routes/export-pdf");
const setLocals = require("./middlewares/setLocals");
const sequelize = require("./config/db");
const User = require("./models/User");

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false})); // Untuk parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // Untuk parsing application/json
app.use(express.static("public")); // Set folder 'public' untuk file statis
app.use(expressLayouts); // Menggunakan layout untuk EJS
app.set("view engine", "ejs"); // Set view engine ke EJS

// Konfigurasi session
app.use(
  session({
    secret: "your_secret_key",
    resave: false, 
    saveUninitialized: true,
  })
);

// Middleware untuk set data locals
app.use(setLocals);

// Sinkronisasi database dan tambah user default (bpmj) jika belum ada
sequelize
  .sync()
  .then(async () => {
    await User.bulkCreate(
      [
        {
          username: "bpmj",
          password: "thisisbpmj123", 
          role: "bpmj",
          kolom: "All",
        }, // kredensial contoh, bisa diganti
      ],
      {
        ignoreDuplicates: true, // Abaikan duplikasi jika entri sudah ada
      }
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Rotes aplikasi
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", incomeRouter);
app.use("/", expenseRouter);
app.use("/", jadwalRouter);
app.use("/", beritaRouter);
app.use("/", kolomRouter);
app.use("/", kategoriRouter);
app.use("/", userRouter);
app.use("/", exportRoutes);

// Menentukan port dan menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
