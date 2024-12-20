const { Watchlist } = require("../../db");

const addTvListController = async (
  id,
  title,
  overview,
  image,
  date,
  rating,
  media_type
) => {
  const tv = await Watchlist.findOrCreate({
    where: { id, name, origin, status, image, species, gender },
  });
  return;
};

module.exports = addTvListController;
