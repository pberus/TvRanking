const getApiFilmsController = require("../../controllers/API/getFilms");
const { Film } = require("../../db");

const getApiFilmsHandler = async (req, res) => {
  try {
    const filmsExist = await Film.findOne()
    if (!filmsExist) {
      const films = await getApiFilmsController();    
      const filmsToInsert = films?.map(
        ({
          id,
          original_title,
          release_date,
          poster_path,
          overview,
          vote_average
        }) => ({
          id,
          title: original_title,
          year: release_date,
          image: poster_path,
          overview,
          rating: vote_average
        })
      );
      await Film.bulkCreate(filmsToInsert);
    }

    const allFilms = await Film.findAll()
    return res.json(allFilms)
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiFilmsHandler;