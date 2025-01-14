const { Watchlist, Seen, Liked } = require("../../db");

const removeTvListController = async (list_type, id) => {
  let model = Watchlist;
  if (list_type === "seen") model = Seen;
  if (list_type === "liked") model = Liked;

  const { title } = await model.findByPk(id);

  const registersDeleted = await model.destroy({
    where: {
      id,
    },
  });

  if (!registersDeleted)
    throw new Error("The title could not be deleted because it is not saved!");

  const allTv = await model.findAll({
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return { allTv, title };
};

module.exports = removeTvListController;
