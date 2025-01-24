const axios = require("axios");

const { API_KEY } = process.env;
const SEARCH_URL = (query) =>
  `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=es-AR&page=1`;

const searchController = async (tv) => {
  const { data } = await axios(SEARCH_URL(tv));

  const results = data.results.filter(
    (tv) => tv.media_type !== "person" && tv.media_type !== "collection"
  );
  return results;
};

module.exports = searchController;
