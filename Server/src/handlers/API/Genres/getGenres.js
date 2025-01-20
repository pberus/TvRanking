const getApiGenresController = require("../../../controllers/API/Genres/getGenres");

const getApiGenresHandler = async (req, res) => {
  try {
    let genres = await getApiGenresController();

    return res.json(genres);
  } catch (error) {
    console.log("error genres: ", error.message);
  }
};

module.exports = getApiGenresHandler;
