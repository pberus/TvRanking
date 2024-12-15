const router = require("express").Router();

const films = require("./Films/films")
const series = require("./Series/series")
const discover = require("./Discover/discover")
const lenguages = require("./Lenguages/lenguages")
const genres = require("./Genres/genres")

router.use("/films", films)
router.use("/series", series)
router.use("/discover", discover)
router.use("/lenguages", lenguages)
router.use("/genres", genres)
router.use("/", (req, res) => res.send("Server de TvRanking"))

module.exports = router;