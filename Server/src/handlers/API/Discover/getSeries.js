const getApiDiscoverSeriesController = require("../../../controllers/API/Discover/getSeries");

const getApiDiscoverSeriesHandler = async (req, res) => {
  try {
    const {
      sort_by,
      year_range,
      lenguage,
      genres,
      runtime,
      rating,
      providers,
      page,
    } = req.query;

    let { results, totalPages } = await getApiDiscoverSeriesController(
      sort_by,
      year_range,
      lenguage,
      genres,
      runtime,
      rating,
      providers,
      page
    );
    results = results?.map(
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
        date: first_air_date,
        rating: vote_average,
        media_type: "tv",
      })
    );
    return res.json({ results, totalPages });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiDiscoverSeriesHandler;
