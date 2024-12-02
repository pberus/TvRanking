const getApiTopRatedFilmsController = require("../../../controllers/API/Films/getTopRated");
const { Film } = require("../../../db");

const getApiTopRatedFilmsHandler = async (req, res) => {
  try {
    const filmsExist = await Film.findOne();
    if (!filmsExist) {
      const films = await getApiTopRatedFilmsController();
      const filmsToInsert = films?.map(
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
          top_rated: true,
          image: poster_path,
          year: release_date,
          rating: vote_average,
        })
      );
      await Film.bulkCreate(filmsToInsert, {
        updateOnDuplicate: ["top_rated"], // Lista de campos que deseas actualizar
      });
    }

    const allFilms = await Film.findAll({
      where: {
        top_rated: true,
      },
    });
    return res.json(allFilms);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiTopRatedFilmsHandler;
