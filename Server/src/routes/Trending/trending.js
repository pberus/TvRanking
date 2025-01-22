const getTrending = require("../../handlers/API/Trending/getTrending");

const routerTrending = require("express").Router();

routerTrending.get("/", getTrending);

module.exports = routerTrending;
