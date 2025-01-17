const routerLogout = require("express").Router();

routerLogout.post("/", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.send("Cierre de sesion exitoso");
});

module.exports = routerLogout;
