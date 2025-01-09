const getApiDiscoverFilmsController = require("../../../controllers/API/Discover/getFilms");

const getApiDiscoverFilmsHandler = async (req, res) => {
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
      await getApiDiscoverFilmsController(
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
      ({ id, title, overview, poster_path, release_date, vote_average }) => ({
        id,
        title,
        overview,
        image: poster_path,
        date: release_date,
        rating: vote_average,
        media_type: "movie",
      })
    );
    return res.json({ results, totalPages, totalResults });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiDiscoverFilmsHandler;
