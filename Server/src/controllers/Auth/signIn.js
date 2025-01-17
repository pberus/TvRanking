const { User } = require("../../db");
const { Op } = require("sequelize");

const signInController = async (email) => {
  const userFound = await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${email}`,
      },
    },
  });

  if (!userFound) throw new Error("Usuario no encontrado.");

  return userFound;
};

module.exports = signInController;
