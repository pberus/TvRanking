const router = require("express").Router();

const films = require("./Films/films")

router.use("/films", films)
router.use("/", (req, res) => res.send("Server de TvRanking"))

module.exports = router;