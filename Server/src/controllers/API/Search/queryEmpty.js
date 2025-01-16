const axios = require("axios");

const { API_KEY } = process.env;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=es-AR`;

const queryEmptyController = async (tv) => {
  const { data } = await axios(TRENDING_URL);

  const results = data.results.filter((tv) => tv.media_type !== "person");
  return results;
};

module.exports = queryEmptyController;
