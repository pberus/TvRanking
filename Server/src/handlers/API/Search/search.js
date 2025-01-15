const searchController = require("../../../controllers/API/Search/search");

const searchHandler = async (req, res) => {
  try {
    const { tv } = req.params;

    const results = await searchController(tv);

    return res.json(results);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = searchHandler;
