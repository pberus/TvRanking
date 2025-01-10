const axios = require("axios");

const { API_KEY } = process.env;
const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-AR&page=1`;

const getApiPopularSeriesController = async () => {
  const { data } = await axios(URL);
  return data.results;
};

module.exports = getApiPopularSeriesController;
