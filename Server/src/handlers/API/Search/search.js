const searchController = require("../../../controllers/API/Search/search");

const searchHandler = async (req, res) => {
  try {
    const { tv } = req.params;

    let results = await searchController(tv);

    function searchAndSort(items, searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();

      return items
        .map((item) => {
          const title = item.title?.toLowerCase() || item.name?.toLowerCase();
          const popularity = item.popularity;

          // Coincidencia exacta: puntaje 10
          let matchScore = title === lowerTerm ? 10 : 0;

          // Coincidencia parcial: puntaje 5
          if (!matchScore && title.includes(lowerTerm)) {
            matchScore = 5;
          }

          // Puntuación total: combinación de coincidencia y popularidad
          const totalScore = matchScore + popularity;

          return { ...item, totalScore };
        })
        .sort((a, b) => b.totalScore - a.totalScore); // Ordenar por puntuación total
    }

    results = searchAndSort(results, tv);
    return res.json(results);
  } catch (error) {
    console.log("error search: ", error.message);
  }
};

module.exports = searchHandler;
