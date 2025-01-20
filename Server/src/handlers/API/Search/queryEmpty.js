const queryEmptyController = require("../../../controllers/API/Search/queryEmpty");

const queryEmptyHandler = async (req, res) => {
  try {
    let results = await queryEmptyController();

    return res.json(results);
  } catch (error) {
    console.log("error search query empty: ", error.message);
  }
};

module.exports = queryEmptyHandler;
