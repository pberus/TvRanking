const searchPopoverController = require("../../../controllers/API/Search/popover");

const searchPopoverHandler = async (req, res) => {
  try {
    const { tv } = req.params;

    let { movies, series } = await searchPopoverController(tv);

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

    movies = searchAndSort(movies, tv).slice(0, 4);
    series = searchAndSort(series, tv).slice(0, 4);
    return res.json({ movies, series });
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = searchPopoverHandler;
