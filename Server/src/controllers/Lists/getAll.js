const { Watchlist, Seen, Liked } = require("../../db");

const getAllListsController = async () => {
  const watchlist = await Watchlist.findAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const seen = await Seen.findAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const liked = await Liked.findAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return {
    watchlist,
    seen,
    liked,
  };
};

module.exports = getAllListsController;
