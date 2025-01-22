const axios = require("axios");

const { API_KEY } = process.env;
const TRENDING_URL = (media) =>
  `https://api.themoviedb.org/3/trending/${media}/week?api_key=${API_KEY}&language=es-AR`;

const getTrendingController = async (media_type) => {
  const { data } = await axios(TRENDING_URL(media_type));
  return data.results.slice(0, 10);
};

module.exports = getTrendingController;
