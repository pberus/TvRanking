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
    const userId = req.user.id;

    const filteredList = await getFilteredListController(
      media_type,
      sort_by,
      year_range,
      lenguage,
      genres,
      runtime,
      rating,
      providers,
      list,
      userId
    );
    return res.json(filteredList);
  } catch (error) {
    console.log("error lists getfiltered: ", error.message);
  }
};

module.exports = getFilteredListHandler;
