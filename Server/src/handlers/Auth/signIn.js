const signInController = require("../../controllers/Auth/signIn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.query;
    const userFound = await signInController(email);

    const isValid = await bcrypt.compare(password, userFound.password);
    if (!isValid) throw new Error("Contraseña incorrecta.");

    const accessToken = jwt.sign(
      { id: userFound.id, name: userFound.name, email: userFound.email },
      JWT_ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: userFound.id },
      JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.send("Usuario logueado con exito!");
  } catch (error) {
    console.log("error signin: ", error.message);
    switch (error.message) {
      case "Usuario no encontrado.":
        return res.status(404).send(error.message);
      case "Contraseña incorrecta.":
        return res.status(403).send(error.message);
      default:
        return res.status(500).send(error.message);
    }
  }
};

module.exports = signInHandler;
