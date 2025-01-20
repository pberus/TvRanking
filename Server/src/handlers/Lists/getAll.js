const getAllListsController = require("../../controllers/Lists/getAll");

const getAllListsHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const allLists = await getAllListsController(userId);
    return res.json(allLists);
  } catch (error) {
    console.log("error lists getall: ", error.message);
  }
};

module.exports = getAllListsHandler;
