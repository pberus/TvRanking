const signUpController = require("../../controllers/Auth/signUp");

const signUpHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userCreated = await signUpController(name, email, password);
    return res.send(userCreated);
  } catch (error) {
    console.log("error: ", error.message);
    error.message.includes("email")
      ? res.status(409).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = signUpHandler;
