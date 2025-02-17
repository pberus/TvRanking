const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const PassportGoogle = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const {
  JWT_ACCESS_SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = process.env;
const { User } = require("./db");
const { Op } = require("sequelize");

const URL = process.env.BACKEND_URL || "http://localhost:3001";

const server = express();

server.use(morgan("dev"));
server.use(cookieParser());
server.use(express.json());
server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Permite solo el dominio especificado
    credentials: true, // Permite el envío de cookies
  })
);

passport.use(
  new PassportGoogle(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: URL + "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({
          where: {
            email: {
              [Op.iLike]: `%${profile.emails[0].value}`,
            },
          },
        });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          JWT_ACCESS_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return cb(null, { user, token });
      } catch (error) {
        console.error("Error en la estrategia Passport de Google:", error);
        return cb(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: URL + "/auth/facebook/callback",
      profileFields: ["displayName", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({
          where: {
            email: {
              [Op.iLike]: `%${profile.emails[0].value}`,
            },
          },
        });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          JWT_ACCESS_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return cb(null, { user, token });
      } catch (error) {
        console.error("Error en la estrategia Passport de facebook:", error);
        return cb(error);
      }
    }
  )
);

server.use(passport.initialize());

server.use((req, res, next) => {
  //Si la solicitud es para crear un nuevo token, saltear, porque sino se hace un bucle de TokenExpiredError
  if (req.path === "/refresh-token") return next();

  const accessToken = req.cookies.access_token;

  if (accessToken) {
    try {
      const tokenData = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
      req.user = tokenData;
    } catch (error) {
      if (error.name === "TokenExpiredError")
        return res.status(401).send("Access token expired");
      return res.status(403).send(error.message);
    }
  }

  next();
});

server.use(router);

module.exports = server;
