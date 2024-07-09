const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
// import db
const sequelize = require("./config/db");
// import router
const indexRouter = require("./routes/index");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

// Route
app.use("/", indexRouter);

// Sync database dan start server
sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
