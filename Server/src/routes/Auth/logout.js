const routerLogout = require("express").Router();

routerLogout.post("/", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.json({ authenticated: false });
});

module.exports = routerLogout;
