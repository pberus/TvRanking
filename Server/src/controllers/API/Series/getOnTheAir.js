const axios = require("axios");

const {API_KEY} = process.env;
const URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;


const getApiOnTheAirSeriesController = async () => {  
  const { data } = await axios(URL);  
  return data.results;
};

module.exports = getApiOnTheAirSeriesController