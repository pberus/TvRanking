const axios = require("axios");

const { API_KEY } = process.env;
const FILMS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;

const getApiDiscoverFilmsController = async (sortBy) => {
  const { data } = await axios(
    sortBy === "trending" ? TRENDING_URL : FILMS_URL + `${sortBy}.desc`
  );
  return data.results;
};

module.exports = getApiDiscoverFilmsController;
