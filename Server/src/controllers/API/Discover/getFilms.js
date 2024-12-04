const axios = require("axios");

const {API_KEY} = process.env;
const FILMS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const getApiDiscoverFilmsController = async () => {  
  const { data } = await axios(FILMS_URL);
  return data.results;
};

module.exports = getApiDiscoverFilmsController;