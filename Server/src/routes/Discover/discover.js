const getFilms = require("../../handlers/API/Discover/getFilms");
const getSeries = require("../../handlers/API/Discover/getSeries")

const routerDiscover = require("express").Router();

routerDiscover.get("/films", getFilms);
routerDiscover.get("/series", getSeries);

module.exports = routerDiscover;
