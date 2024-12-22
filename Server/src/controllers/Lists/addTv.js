const { Watchlist, Seen, Liked } = require("../../db");

const addTvListController = async (
  id,
  title,
  overview,
  image,
  date,
  rating,
  media_type,
  list_type
) => {
  let model = Watchlist;
  if (list_type === "seen") model = Seen;
  if (list_type === "liked") model = Liked;

  const [tv, created] = await model.findOrCreate({
    where: { id, title, overview, image, date, rating, media_type, list_type },
  });

  if (!created) throw new Error("The title already exists!");

  const allTv = await model.findAll();
  return allTv;
};

module.exports = addTvListController;
