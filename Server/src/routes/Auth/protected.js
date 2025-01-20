const routerProtected = require("express").Router();

routerProtected.get("/", (req, res) => {
  if (req.user) {
    return res.json({ authenticated: true, user: req.user.id });
  }

  return res.status(401).json({ authenticated: false });
});

module.exports = routerProtected;
