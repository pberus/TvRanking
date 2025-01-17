const signInController = require("../../controllers/Auth/signIn");

const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.query;
    const userCreated = await signInController(email, password);
    return res.send(userCreated);
  } catch (error) {
    console.log("error: ", error.message);
    error.message.includes("Usuario no encontrado")
      ? res.status(404).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = signInHandler;
