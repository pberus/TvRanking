const getFilteredListController = require("../../controllers/Lists/getFiltered");

const getFilteredListHandler = async (req, res) => {
  try {
    const {
      media_type,
      sort_by,
      year_range,
      lenguage,
      genres,
      runtime,
      rating,
      providers,
      list,
    } = req.query;

    const filteredList = await getFilteredListController(
      media_type,
      sort_by,
      year_range,
      lenguage,
      genres,
      runtime,
      rating,
      providers,
      list
    );
    return res.json(filteredList);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getFilteredListHandler;
