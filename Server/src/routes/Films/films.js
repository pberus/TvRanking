const getFilms = require("../../handlers/API/getFilms");

const routerFilms = require("express").Router();

routerFilms.get("/", getFilms)

module.exports = routerFilms;