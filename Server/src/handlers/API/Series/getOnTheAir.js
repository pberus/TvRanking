const getApiOnTheAirSeriesController = require("../../../controllers/API/Series/getOnTheAir");

const getApiOnTheAirSeriesHandler = async (req, res) => {
  try {
    let series = await getApiOnTheAirSeriesController();
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
        date: first_air_date,
        rating: vote_average,
      })
    );
    return res.json(series);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiOnTheAirSeriesHandler;
