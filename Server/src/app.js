const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET_KEY } = process.env;

const server = express();

server.use(morgan("dev"));
server.use(cookieParser());
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173", // Permite solo el dominio especificado
    credentials: true, // Permite el envío de cookies
  })
);

server.use((req, res, next) => {
  //Si la solicitud es para crear un nuevo token, saltear, porque sino se hace un bucle de TokenExpiredError
  if (req.path === "/refresh-token") return next();

  const accessToken = req.cookies.access_token;
  req.user = null;

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
