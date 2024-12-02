const axios = require("axios");

const {API_KEY} = process.env;
const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

const getApiNowPlayingFilmsController = async () => {  
  const { data } = await axios(URL);  
  return data.results;
};

module.exports = getApiNowPlayingFilmsController;