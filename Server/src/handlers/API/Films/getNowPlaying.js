const getApiNowPlayingFilmsController = require("../../../controllers/API/Films/getNowPlaying");
const { Film } = require("../../../db");

const getApiNowPlayingFilmsHandler = async (req, res) => {
  try {
    const filmsExist = await Film.findOne();
    if (!filmsExist) {
      const films = await getApiNowPlayingFilmsController();
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
          now_playing: true,
          image: poster_path,
          year: release_date,
          rating: vote_average,
        })
      );
      await Film.bulkCreate(filmsToInsert, {
        updateOnDuplicate: ["now_playing"], // Lista de campos que deseas actualizar
      });
    }

    const allFilms = await Film.findAll({
      where: {
        now_playing: true,
      },
    });
    return res.json(allFilms);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiNowPlayingFilmsHandler;
