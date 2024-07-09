// Aturan untuk autentikasi

// Memastikan pengguna login
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); 
  }
  res.redirect("/login"); // Jika belum login, arahkan ke halaman login
};

// Meneruskan pengguna yang sudah login
exports.forwardAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return next(); 
  }
  res.redirect("/"); // Jika sudah login, arahkan ke halaman utama
};

// Untuk kontrol akses per role
exports.ensureRole = (role) => {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      return next(); 
    }
    res.status(403).send('Forbidden'); // Jika role tidak sesuai, kirim status 403
  };
};
