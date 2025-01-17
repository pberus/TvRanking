const { User } = require("../../db");
const { Op } = require("sequelize");

const signUpController = async (name, email, password) => {
  const userFound = await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${email}`,
      },
    },
  });

  if (userFound) throw new Error("Este email ya se encuentra registrado");

  await User.create({
    name,
    email,
    password,
  });

  return "Usuario registrado con exito!";
};

module.exports = signUpController;
