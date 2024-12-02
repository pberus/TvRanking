const getApiUpcomingFilmsController = require("../../../controllers/API/Films/getUpcoming");
const { Film } = require("../../../db");

const getApiUpcomingFilmsHandler = async (req, res) => {
  try {
    const filmsExist = await Film.findOne();
    if (!filmsExist) {
      const films = await getApiUpcomingFilmsController();
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
          upcoming: true,
          image: poster_path,
          year: release_date,
          rating: vote_average,
        })
      );
      await Film.bulkCreate(filmsToInsert, {
        updateOnDuplicate: ["upcoming"], // Lista de campos que deseas actualizar
      });
    }

    const allFilms = await Film.findAll({
      where: {
        upcoming: true,
      },
    });
    return res.json(allFilms);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiUpcomingFilmsHandler;
