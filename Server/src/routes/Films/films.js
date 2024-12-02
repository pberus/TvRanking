const getPopularFilms = require("../../handlers/API/Films/getPopular");
const getTopRatedFilms = require("../../handlers/API/Films/getTopRated")
const getNowPlayingFilms = require("../../handlers/API/Films/getNowPlaying")
const getUpcomingFilms = require("../../handlers/API/Films/getUpcoming")

const routerFilms = require("express").Router();

routerFilms.get("/popular", getPopularFilms);
routerFilms.get("/top-rated", getTopRatedFilms);
routerFilms.get("/now-playing", getNowPlayingFilms);
routerFilms.get("/upcoming", getUpcomingFilms);

module.exports = routerFilms;
