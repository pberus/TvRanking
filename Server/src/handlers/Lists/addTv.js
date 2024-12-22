const addTvListController = require("../../controllers/Lists/addTv");

const addTvListHandler = async (req, res) => {
  try {
    const { id, title, overview, image, date, rating, media_type, list_type } =
      req.body;

    const allTv = await addTvListController(
      id,
      title,
      overview,
      image,
      date,
      rating,
      media_type,
      list_type
    );
    return res.json({allTv, list_type});
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = addTvListHandler;
