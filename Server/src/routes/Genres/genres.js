const getGenres = require("../../handlers/API/Genres/getGenres");

const routerGenres = require("express").Router();

routerGenres.get("/", getGenres);

module.exports = routerGenres;
