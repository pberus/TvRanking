const getApiDiscoverSeriesController = require("../../../controllers/API/Discover/getSeries");

const getApiDiscoverSeriesHandler = async (req, res) => {
  try {
    const { sort_by } = req.query;

    let series = await getApiDiscoverSeriesController(sort_by);
    series = series?.map(
      ({
        id,
        original_name,
        overview,
        poster_path,
        first_air_date,
        vote_average,
      }) => ({
        id,
        title: original_name,
        overview,
        image: poster_path,
        year: first_air_date,
        rating: vote_average,
        media_type: "tv",
      })
    );
    return res.json(series);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiDiscoverSeriesHandler;
