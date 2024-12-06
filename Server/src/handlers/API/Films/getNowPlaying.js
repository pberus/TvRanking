const getApiNowPlayingFilmsController = require("../../../controllers/API/Films/getNowPlaying");

const getApiNowPlayingFilmsHandler = async (req, res) => {
  try {
    let films = await getApiNowPlayingFilmsController();
    films = films?.map(
      ({
        id,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average,
      }) => ({
        id,
        title: original_title,
        overview,
        image: poster_path,
        date: release_date,
        rating: vote_average,
      })
    );
    return res.json(films);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiNowPlayingFilmsHandler;
