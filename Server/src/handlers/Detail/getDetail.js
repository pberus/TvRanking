const getDetailController = require("../../controllers/Detail/getDetail");

const getDetailHandler = async (req, res) => {
  try {
    const { title, media_type } = req.query;

    const detail = await getDetailController(title, media_type);
    return res.json(detail);
  } catch (error) {
    console.log("error detail handler: ", error.message);
  }
};

module.exports = getDetailHandler;
