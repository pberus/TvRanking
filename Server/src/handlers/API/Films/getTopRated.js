const getApiTopRatedFilmsController = require("../../../controllers/API/Films/getTopRated");

const getApiTopRatedFilmsHandler = async (req, res) => {
  try {
    let films = await getApiTopRatedFilmsController();
    films = films?.map(
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
    return res.json(films);
  } catch (error) {
    console.log("error films: ", error.message);
  }
};

module.exports = getApiTopRatedFilmsHandler;
