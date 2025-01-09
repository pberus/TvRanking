const { Op } = require("sequelize");
const { Watchlist, Seen, Liked } = require("../../db");

const getFilteredListController = async (
  media_type,
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating,
  providers,
  list
) => {
  let model = Watchlist;
  if (list === "seen") model = Seen;
  if (list === "liked") model = Liked;

  const whereClause = { media_type };

  if (yearRange) {
    const [startYear, endYear] = yearRange.split(",");
    whereClause.date = {
      [Op.between]: [`${startYear}-01-01`, `${endYear}-12-31`],
    };
  }

  if (lenguage) {
    whereClause.lenguage = lenguage;
  }

  if (genres) {
    const genresArray = genres.split(",").map(Number);
    whereClause.genres = {
      [Op.overlap]: genresArray,
    };
  }

  if (runtime) {
    const [startTime, endTime] = runtime.split(",");
    whereClause.runtime = {
      [Op.between]: [startTime, endTime],
    };
  }

  if (rating) {
    const [startRating, endRating] = rating.split(",");
    whereClause.rating = {
      [Op.between]: [startRating, endRating],
    };
  }

  if (providers) {
    const providersArray = providers.split(",").map(Number);
    whereClause.providers = {
      [Op.overlap]: providersArray,
    };
  }

  let orderClause = ["createdAt", "DESC"];

  if (sortBy) {
    sortBy === "last_added" && (orderClause = ["createdAt", "DESC"]);
    sortBy === "popularity" && (orderClause = ["popularity", "DESC"]);
    sortBy === "date" && (orderClause = ["date", "DESC"]);
    sortBy === "title" && (orderClause = ["title", "ASC"]);
    sortBy === "vote_average" && (orderClause = ["rating", "DESC"]);
    sortBy === "revenue" && (orderClause = ["revenue", "DESC"]);
    sortBy === "vote_count" && (orderClause = ["vote_count", "DESC"]);
  }

  const filteredList = await model.findAll({
    where: whereClause,
    order: [orderClause],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return filteredList;
};

module.exports = getFilteredListController;
