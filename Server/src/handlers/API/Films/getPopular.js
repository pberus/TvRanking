const getApiPopularFilmsController = require("../../../controllers/API/Films/getPopular");
const { Film } = require("../../../db");

const getApiPopularFilmsHandler = async (req, res) => {
  try {
    const filmsExist = await Film.findOne();
    if (!filmsExist) {
      const films = await getApiPopularFilmsController();
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
          popular: true,
          image: poster_path,
          year: release_date,
          rating: vote_average,
        })
      );
      await Film.bulkCreate(filmsToInsert, {
        updateOnDuplicate: ["popular"], // Lista de campos que deseas actualizar
      });
    }

    const allFilms = await Film.findAll({
      where: {
        popular: true,
      },
    });
    return res.json(allFilms);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiPopularFilmsHandler;
