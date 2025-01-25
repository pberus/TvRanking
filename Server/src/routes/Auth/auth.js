const passport = require("passport");
const signUp = require("../../handlers/Auth/signUp");
const signIn = require("../../handlers/Auth/signIn");
const jwt = require("jsonwebtoken");
const { JWT_REFRESH_SECRET_KEY } = process.env;

const URL = process.env.FRONTEND_URL || "http://localhost:5173";

const routerAuth = require("express").Router();

routerAuth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

routerAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: URL + "/auth/login",
  }),
  async (req, res) => {
    // Generar un token de acceso JWT para el usuario
    const accessToken = req.user.token;

    // Opcionalmente, generar un refresh token y almacenarlo en la cookie
    const refreshToken = jwt.sign(
      { id: req.user.user.id },
      JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" } // El refresh token puede durar más tiempo
    );

    // Establecer el token en la cookie HTTP-only (solo accesible por el servidor)
    res.cookie("access_token", accessToken, {
      httpOnly: true, // Protección contra XSS
      secure: process.env.NODE_ENV === "production", // Asegúrate de usar `secure` en producción
      sameSite: "Strict", // Protege contra ataques CSRF
    });

    // Opcionalmente, puedes enviar el refresh token también en la cookie o en el cuerpo de la respuesta
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Redirigir a la página principal u otra página segura
    res.redirect(URL);
  }
);

routerAuth.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
  })
);

routerAuth.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: URL + "/auth/login",
  }),
  async function (req, res) {
    const accessToken = req.user.token;

    const refreshToken = jwt.sign(
      { id: req.user.user.id },
      JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.redirect(URL);
  }
);

routerAuth.post("/", signUp);
routerAuth.get("/", signIn);

module.exports = routerAuth;
