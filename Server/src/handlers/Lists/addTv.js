const addTvListController = require("../../controllers/Lists/addTv");

const addTvListHandler = async (req, res) => {
  try {
    const { id, list, media_type } = req.body;
    const userId = req.user.id;

    const { allTv, title } = await addTvListController(
      id,
      list,
      media_type,
      userId
    );
    return res.json({ allTv, list_type: list, title });
  } catch (error) {
    console.log("error lists addtv: ", error.message);
  }
};

module.exports = addTvListHandler;
