const routerProtected = require("express").Router();

routerProtected.get("/", (req, res) => {
  if (req.user) {
    return res.json({ authenticated: true });
  }

  return res.status(401).json({ authenticated: false });
});

module.exports = routerProtected;
