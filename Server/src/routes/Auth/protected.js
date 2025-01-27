const routerProtected = require("express").Router();

routerProtected.get("/", (req, res) => {
  if (req.user) {
    console.log("req.user", req.user);

    return res.json({
      authenticated: true,
      name: req.user.name,
      email: req.user.email,
    });
  }

  return res.status(401).json({ authenticated: false });
});

module.exports = routerProtected;
