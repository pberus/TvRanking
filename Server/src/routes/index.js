const router = require("express").Router();

const films = require("./Films/films");
const series = require("./Series/series");
const discover = require("./Discover/discover");
const lenguages = require("./Lenguages/lenguages");
const genres = require("./Genres/genres");
const providers = require("./Providers/providers");
const lists = require("./Lists/lists");
const detail = require("./Detail/detail");

router.use("/films", films);
router.use("/series", series);
router.use("/discover", discover);
router.use("/lenguages", lenguages);
router.use("/genres", genres);
router.use("/providers", providers);
router.use("/lists", lists);
router.use("/detail", detail);
router.use("/", (req, res) => res.send("Server de TvRanking"));

module.exports = router;
