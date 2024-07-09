const User = require("../models/User");


// menampilkan semua user
exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.render("user/user", {users, currentRoute: "/user", layout: "layout", showHeader: true, dashboardCss: true});
};

// menampilkan form tambah user
exports.addUserForm = (req, res) => {
  res.render("user/addUser", {layout: "layout", showHeader: true, dashboardCss: true, currentRoute: "/user"});
};

// proses tambah user
exports.addUser = async (req, res) => {
  const {username, password, role} = req.body;
  await User.create({username, password, role});
  res.redirect("/user");
};

// menampilkan form edit user
exports.editUserForm = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render("user/editUser", {user, layout: "layout", showHeader: true, dashboardCss: true, currentRoute: "/user"});
};

// proses edit user
exports.updateUser = async (req, res) => {
  const {username, password, role} = req.body;
  await User.update({username, password, role}, {where: {id: req.params.id}});
  res.redirect("/user");
};

// proses hapus user
exports.deleteUser = async (req, res) => {
  await User.destroy({where: {id: req.params.id}});
  res.redirect("/user");
};
