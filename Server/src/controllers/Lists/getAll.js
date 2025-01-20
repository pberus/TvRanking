const { Watchlist, Seen, Liked } = require("../../db");

const getAllListsController = async (userId) => {
  const watchlist = await Watchlist.findAll({
    where: {
      UserId: userId,
    },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const seen = await Seen.findAll({
    where: {
      UserId: userId,
    },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const liked = await Liked.findAll({
    where: {
      UserId: userId,
    },
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
