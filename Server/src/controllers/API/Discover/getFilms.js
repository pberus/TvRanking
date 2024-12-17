const axios = require("axios");

const { API_KEY } = process.env;
const FILMS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;

const getApiDiscoverFilmsController = async (
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating
) => {
  let discoverURL = FILMS_URL;

  if (
    sortBy === "trending" &&
    !yearRange &&
    !lenguage &&
    !genres &&
    !runtime &&
    !rating
  )
    discoverURL = TRENDING_URL;
  else {
    discoverURL += `&page=1`;

    if (!sortBy || sortBy === "trending")
      discoverURL += `&sort_by=popularity.desc`;
    else {
      discoverURL += `&sort_by=${sortBy}.desc`;
      if (sortBy === "vote_average") discoverURL += `&vote_count.gte=1000`;
    }

    if (yearRange) {
      const [startYear, endYear] = yearRange.split(",");
      discoverURL += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }

    if (lenguage) {
      discoverURL += `&with_original_language=${lenguage}`;
    }

    if (genres) {
      genres = genres.replace(new RegExp(",", "g"), "%2C");
      discoverURL += `&with_genres=${genres}`;
    }

    if (runtime) {
      const [startTime, endTime] = runtime.split(",");
      discoverURL += `&with_runtime.gte=${startTime}&with_runtime.lte=${endTime}`;
    }

    if (rating) {
      const [startRating, endRating] = rating.split(",");
      discoverURL += `&vote_average.gte=${startRating}&vote_average.lte=${endRating}&vote_count.gte=500`;
    }
  }
  console.log(discoverURL);

  const { data } = await axios(discoverURL);
  return data.results;
};

module.exports = getApiDiscoverFilmsController;
