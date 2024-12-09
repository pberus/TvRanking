const axios = require("axios");

const { API_KEY } = process.env;
const FILMS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;

const getApiDiscoverFilmsController = async (sortBy, yearRange, lenguage) => {
  let discoverURL = FILMS_URL;

  if (sortBy === "trending" && !yearRange && !lenguage)
    discoverURL = TRENDING_URL;
  else {
    discoverURL += `&page=1`;

    if (!sortBy || sortBy === "trending")
      discoverURL += `&sort_by=popularity.desc`;
    else discoverURL += `&sort_by=${sortBy}.desc`;

    if (yearRange) {
      const [startYear, endYear] = yearRange.split(",");
      discoverURL += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }

    if (lenguage) {
      discoverURL += `&with_original_language=${lenguage}`;
    }
  }

  const { data } = await axios(discoverURL);
  return data.results;
};

module.exports = getApiDiscoverFilmsController;
