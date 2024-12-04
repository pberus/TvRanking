const getAiringToday = require("../../handlers/API/Series/getAiringToday");
const getOnTheAir = require("../../handlers/API/Series/getOnTheAir");
const getPopular = require("../../handlers/API/Series/getPopular");
const getTopRated = require("../../handlers/API/Series/getTopRated");

const routerSeries = require("express").Router();

routerSeries.get("/airing-today", getAiringToday);
routerSeries.get("/on-the-air", getOnTheAir);
routerSeries.get("/popular", getPopular);
routerSeries.get("/top-rated", getTopRated);

module.exports = routerSeries;