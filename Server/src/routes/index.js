const router = require("express").Router();

const films = require("./Films/films");
const series = require("./Series/series");
const discover = require("./Discover/discover");
const trending = require("./Trending/trending");
const lenguages = require("./Lenguages/lenguages");
const genres = require("./Genres/genres");
const providers = require("./Providers/providers");
const lists = require("./Lists/lists");
const detail = require("./Detail/detail");
const search = require("./Search/search");
const auth = require("./Auth/auth");
const protected = require("./Auth/protected");
const logout = require("./Auth/logout");
const refreshToken = require("./Auth/refreshToken");

router.use("/films", films);
router.use("/series", series);
router.use("/discover", discover);
router.use("/trending", trending);
router.use("/lenguages", lenguages);
router.use("/genres", genres);
router.use("/providers", providers);
router.use("/lists", lists);
router.use("/detail", detail);
router.use("/search", search);
router.use("/auth", auth);
router.use("/protected", protected);
router.use("/logout", logout);
router.use("/refresh-token", refreshToken);
router.use("/", (req, res) => res.send("Server de TvRanking"));

module.exports = router;
