const login = (req, res) => {
  res.render("login");
};

const signup = (req, res) => {
  res.render("signup");
};

module.exports = {
  login,
  signup,
};
