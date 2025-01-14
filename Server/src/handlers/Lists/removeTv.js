const removeTvListController = require("../../controllers/Lists/removeTv");

const removeTvListHandler = async (req, res) => {
  try {
    const { list_type, id } = req.query;

    const { allTv, title } = await removeTvListController(list_type, id);
    return res.json({ allTv, list_type, title });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = removeTvListHandler;
