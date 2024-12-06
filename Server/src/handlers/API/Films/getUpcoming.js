const getApiUpcomingFilmsController = require("../../../controllers/API/Films/getUpcoming");

const getApiUpcomingFilmsHandler = async (req, res) => {
  try {
    let films = await getApiUpcomingFilmsController();
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

module.exports = getApiUpcomingFilmsHandler;
