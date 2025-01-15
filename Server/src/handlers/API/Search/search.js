const searchController = require("../../../controllers/API/Search/search");

const searchHandler = async (req, res) => {
  try {
    const { tv } = req.params;

    let results = await searchController(tv);
    results = results?.map(
      ({
        id,
        title,
        poster_path,
        release_date,
        media_type,
        name,
        first_air_date,
      }) => ({
        id,
        title: media_type === "movie" ? title : name,
        image: poster_path,
        date: media_type === "movie" ? release_date : first_air_date,
        media_type,
      })
    );

    return res.json(results);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = searchHandler;
