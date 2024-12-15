const axios = require("axios");

const { API_KEY } = process.env;
const GENRES_URL = `https://api.themoviedb.org/3/genre/`;

const getApiGenresController = async () => {
  const filmsGenres = await axios(
    GENRES_URL + `movie/list?api_key=${API_KEY}&language=es`
  );
  const seriesGenres = await axios(
    GENRES_URL + `tv/list?api_key=${API_KEY}&language=es`
  );
  return {
    films: filmsGenres.data.genres,
    series: seriesGenres.data.genres,
  };
};

module.exports = getApiGenresController;
