const { User } = require("../../db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = process.env;

const signUpController = async (name, email, password) => {
  const userFound = await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${email}`,
      },
    },
  });

  if (userFound) throw new Error("Este email ya se encuentra registrado!");

  const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));

  return await User.create({
    name,
    email,
    password: hashedPassword,
  });
};

module.exports = signUpController;
