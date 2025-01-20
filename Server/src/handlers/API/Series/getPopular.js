const getApiPopularSeriesController = require("../../../controllers/API/Series/getPopular");

const getApiPopularSeriesHandler = async (req, res) => {
  try {
    let series = await getApiPopularSeriesController();
    series = series?.map(
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
    return res.json(series);
  } catch (error) {
    console.log("error series: ", error.message);
  }
};

module.exports = getApiPopularSeriesHandler;
