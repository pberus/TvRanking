const axios = require("axios");

const { API_KEY } = process.env;
const LENGUAGES_URL = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`

const getApiLenguagesController = async () => {
  const { data } = await axios(LENGUAGES_URL);
  return data;
};

module.exports = getApiLenguagesController;
