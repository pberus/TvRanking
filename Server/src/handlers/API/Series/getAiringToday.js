const getApiAiringTodaySeriesController = require("../../../controllers/API/Series/getAiringToday");

const getApiAiringTodaySeriesHandler = async (req, res) => {
  try {
    let series = await getApiAiringTodaySeriesController();
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
      })
    );
    return res.json(series);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiAiringTodaySeriesHandler;
