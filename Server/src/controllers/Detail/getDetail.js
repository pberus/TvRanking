const axios = require("axios");

const { API_KEY } = process.env;
const SEARCH_URL = (media, title, year, yearQuery) =>
  `https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&${yearQuery}=${year}&query=${title}`;
const DETAILS_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&language=en-US`;

const getDetailController = async (title, media_type) => {
  const array = title.split("-");
  const year = array.pop();
  const name = array.join(" ");

  const yearQuery =
    media_type === "movie" ? "primary_release_year" : "first_air_date_year";

  const searchData = await axios(SEARCH_URL(media_type, name, year, yearQuery));
  const id = searchData.data.results[0].id;

  const detailData = await axios(DETAILS_URL(media_type, id));

  return detailData.data;
};

module.exports = getDetailController;
