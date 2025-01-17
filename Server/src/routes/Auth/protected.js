const routerProtected = require("express").Router();

routerProtected.get("/", (req, res) => {
  if (req.user) {
    return res.send("Acceso autorizado");
  }

  return res.status(403).send("Acceso no autorizado");
});

module.exports = routerProtected;
