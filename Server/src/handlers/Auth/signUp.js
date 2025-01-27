const signUpController = require("../../controllers/Auth/signUp");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

const signUpHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userCreated = await signUpController(name, email, password);

    const accessToken = jwt.sign(
      { id: userCreated.id, name: userCreated.name, email: userCreated.email },
      JWT_ACCESS_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: userCreated.id },
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

    return res.send("Usuario registrado con exito!");
  } catch (error) {
    console.log("error signup: ", error.message);
    error.message.includes("email")
      ? res.status(409).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = signUpHandler;
