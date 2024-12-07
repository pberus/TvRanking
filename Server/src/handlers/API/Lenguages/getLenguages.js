const getApiLenguagesController = require("../../../controllers/API/Lenguages/getLenguages");

const getApiLenguagesHandler = async (req, res) => {
  try {
    let lenguages = await getApiLenguagesController();
    lenguages = lenguages?.map(
      ({
        iso_639_1,
        english_name
      }) => ({
        iso: iso_639_1,
        name: english_name
      })
    );    
    return res.json(lenguages);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = getApiLenguagesHandler;
