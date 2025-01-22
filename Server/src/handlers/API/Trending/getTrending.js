const getTrendingController = require("../../../controllers/API/Trending/getTrending");

const getTrendingHandler = async (req, res) => {
  try {
    const { media_type } = req.query;

    let trending = await getTrendingController(media_type);

    trending = trending?.map((tre) => ({
      id: tre.id,
      title: media_type === "movie" ? tre.title : tre.name,
      overview: tre.overview,
      date: media_type === "movie" ? tre.release_date : tre.first_air_date,
      image: tre.backdrop_path,
      media_type: tre.media_type,
    }));
    return res.json(trending);
  } catch (error) {
    console.log("error detail: ", error.message);
    return error.message.includes("película")
      ? res.status(404).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = getTrendingHandler;
