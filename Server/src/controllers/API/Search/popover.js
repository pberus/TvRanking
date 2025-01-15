const axios = require("axios");

const { API_KEY } = process.env;
const SEARCH_URL = (media, query) =>
  `https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&query=${query}&include_adult=false&language=es-AR&page=1`;

const searchPopoverController = async (tv) => {
  const moviesData = await axios(SEARCH_URL("movie", tv));
  const seriesData = await axios(SEARCH_URL("tv", tv));

  const movies = moviesData.data.results;
  const series = seriesData.data.results;

  return { movies, series };
};

module.exports = searchPopoverController;
