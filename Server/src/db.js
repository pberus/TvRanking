require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

//Conexion con la BDD
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tvranking`,
  {
    logging: false,
    native: false,
  }
);

//Cada archivo se importa y se guarda en el arreglo modelDefiners, que luego se recorre para que cada modelo sea inicializado con la instancia de sequelize. Esto permite agregar varios modelos sin tener que importarlos manualmente.
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

//Esto toma los nombres de los modelos que se han registrado y los convierte a PascalCase (primera letra en mayúscula). Esto es útil si los nombres de los archivos no están capitalizados, pero quieres que las referencias en el código lo estén.
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Aca vendrian las relaciones
const { } = sequelize.models;

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};