const getAllListsController = require("../../controllers/Lists/getAll");

const getAllListsHandler = async (req, res) => {
  try {
    const allLists = await getAllListsController();
    return res.json(allLists);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getAllListsHandler;
