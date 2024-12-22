const { Watchlist, Seen, Liked } = require("../../db");

const getAllListsController = async () => {
  const watchlist = await Watchlist.findAll();
  const seen = await Seen.findAll();
  const liked = await Liked.findAll();

  return {
    watchlist,
    seen,
    liked,
  };
};

module.exports = getAllListsController;
