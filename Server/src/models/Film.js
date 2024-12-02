const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Film",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      popular: {
        type: DataTypes.BOOLEAN,
      },
      top_rated: {
        type: DataTypes.BOOLEAN,
      },
      now_playing: {
        type: DataTypes.BOOLEAN,
      },
      upcoming: {
        type: DataTypes.BOOLEAN,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      }
    },
    { timestamps: false }
  );
};