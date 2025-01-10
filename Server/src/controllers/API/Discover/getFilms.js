const axios = require("axios");

const { API_KEY } = process.env;
const FILMS_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=es-AR`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=es-AR`;

const getApiDiscoverFilmsController = async (
  sortBy,
  yearRange,
  lenguage,
  genres,
  runtime,
  rating,
  providers,
  page
) => {
  let discoverURL = FILMS_URL;

  if (
    sortBy === "trending" &&
    !yearRange &&
    !lenguage &&
    !genres &&
    !runtime &&
    !rating &&
    !providers &&
    !page
  )
    discoverURL = TRENDING_URL;
  else {
    if (page) discoverURL += `&page=${page}`;
    else discoverURL += `&page=1`;

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
      genres = genres.replace(new RegExp(",", "g"), "%7C");
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

    if (providers) {
      providers = providers.replace(new RegExp(",", "g"), "%7C");
      discoverURL += `&watch_region=AR&with_watch_providers=${providers}`;
    }
  }

  const { data } = await axios(discoverURL);
  return {
    results: data.results,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
};

module.exports = getApiDiscoverFilmsController;
