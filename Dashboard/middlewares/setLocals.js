// Middleware untuk mengatur variabel lokal 'user'
module.exports = (req, res, next) => {
  res.locals.user = req.session.user || null; // Set 'user' di variabel lokal jika ada, atau null jika tidak ada
  next();
};
