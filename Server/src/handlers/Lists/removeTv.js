const removeTvListController = require("../../controllers/Lists/removeTv");

const removeTvListHandler = async (req, res) => {
  try {
    const { list_type, id } = req.query;
    const userId = req.user.id;

    const { allTv, title } = await removeTvListController(
      list_type,
      id,
      userId
    );
    return res.json({ allTv, list_type, title });
  } catch (error) {
    console.log("error lists removetv: ", error.message);
  }
};

module.exports = removeTvListHandler;
