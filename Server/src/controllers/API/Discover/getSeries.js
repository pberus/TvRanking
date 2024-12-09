const axios = require("axios");

const { API_KEY } = process.env;
const SERIES_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US`;

const getApiDiscoverSeriesController = async (sortBy, yearRange, lenguage) => {
  let discoverURL = SERIES_URL;

  if (sortBy === "trending" && !yearRange && !lenguage)
    discoverURL = TRENDING_URL;
  else {
    discoverURL += `&page=1`;

    if (!sortBy || sortBy === "trending")
      discoverURL += `&sort_by=popularity.desc`;
    else discoverURL += `&sort_by=${sortBy}.desc`;

    if (yearRange) {
      const [startYear, endYear] = yearRange.split(",");
      discoverURL += `&first_air_date.gte=${startYear}-01-01&first_air_date.lte=${endYear}-12-31`;
    }

    if (lenguage) {
      discoverURL += `&with_original_language=${lenguage}`;
    }
  }

  const { data } = await axios(discoverURL);
  return data.results;
};

module.exports = getApiDiscoverSeriesController;
