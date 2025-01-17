const { User } = require("../../db");
const { Op } = require("sequelize");

const signInController = async (email, password) => {
  const userFound = await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${email}`,
      },
      password: {
        [Op.iLike]: `%${password}`,
      },
    },
  });

  if (!userFound) throw new Error("Usuario no encontrado");

  return "Usuario logueado con exito!";
};

module.exports = signInController;
