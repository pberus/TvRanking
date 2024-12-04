const getApiDiscoverFilmsController = require("../../../controllers/API//Discover/getFilms");

const getApiDiscoverFilmsHandler = async (req, res) => {
  try {
    let films = await getApiDiscoverFilmsController();
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
        year: release_date,
        rating: vote_average,
        media_type: "movie"
      })
    );
    return res.json(films);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiDiscoverFilmsHandler;
