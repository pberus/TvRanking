const axios = require("axios");

const {API_KEY} = process.env;
const SERIES_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const getApiDiscoverSeriesController = async () => {  
  const { data } = await axios(SERIES_URL);
  return data.results;
};

module.exports = getApiDiscoverSeriesController;