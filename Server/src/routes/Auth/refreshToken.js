const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const routerRefreshToken = require("express").Router();

const { JWT_REFRESH_SECRET_KEY, JWT_ACCESS_SECRET_KEY } = process.env;

routerRefreshToken.post("/", async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new Error("Refresh token not found");

    const { username } = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);

    const user = await User.findOne({
      where: {
        email: username,
      },
    });

    if (!user) throw new Error("Vuelve a iniciar sesion");

    const newAccessToken = jwt.sign(
      { username: user.email },
      JWT_ACCESS_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.send("Nuevo token creado correctamente");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res
        .status(401)
        .send("El tiempo de sesion expiro, vuelva a iniciar sesion");
    }
    return res.status(403).send(error.message);
  }
});

module.exports = routerRefreshToken;
