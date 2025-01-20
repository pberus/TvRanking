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

    let { results, totalPages, totalResults } =
      await getApiDiscoverSeriesController(
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
      ({ id, name, overview, poster_path, first_air_date, vote_average }) => ({
        id,
        title: name,
        overview,
        image: poster_path,
        date: first_air_date,
        rating: vote_average,
        media_type: "tv",
      })
    );
    return res.json({ results, totalPages, totalResults });
  } catch (error) {
    console.log("error discover: ", error.message);
  }
};

module.exports = getApiDiscoverSeriesHandler;
