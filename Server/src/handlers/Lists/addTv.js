const addTvListController = require("../../controllers/Lists/addTv");

const addTvListHandler = async (req, res) => {
  try {
    const { id, list, media_type } = req.body;

    const allTv = await addTvListController(id, list, media_type);
    return res.json({ allTv, list_type: list });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = addTvListHandler;
