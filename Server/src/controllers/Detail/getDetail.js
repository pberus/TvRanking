const axios = require("axios");

const { API_KEY } = process.env;
const SEARCH_URL = (media, title, year, yearQuery) =>
  `https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&include_adult=false&language=es-AR&page=1&${yearQuery}=${year}&query=${title}`;
const DETAILS_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&language=es-AR`;
const IMAGES_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}/images?api_key=${API_KEY}`;
const CAST_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${API_KEY}&language=es-AR`;
const PROVIDERS_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}/watch/providers?api_key=${API_KEY}`;
const VIDEOS_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${API_KEY}&language=es-AR`;
const SIMILAR_URL = (media, id) =>
  `https://api.themoviedb.org/3/${media}/${id}/similar?api_key=${API_KEY}&language=es-AR&page=1`;

const getDetailController = async (title, media_type) => {
  const array = title.split("-");
  const year = array.pop();
  const name = array.join("%20");

  const yearQuery =
    media_type === "movie" ? "primary_release_year" : "first_air_date_year";

  const searchData = await axios(SEARCH_URL(media_type, name, year, yearQuery));

  if (!searchData.data.results.length)
    throw new Error(
      "No se encontró información de la película o serie solicitada!"
    );

  const id = searchData.data.results[0].id;

  const detailData = await axios(DETAILS_URL(media_type, id));

  const imagesData = await axios(IMAGES_URL(media_type, id));
  const images = imagesData.data.backdrops
    .slice(0, 5)
    .map((image) => image.file_path);

  const castData = await axios(CAST_URL(media_type, id));
  const cast = castData.data.cast.map((act) => ({
    name: act.name,
    character: act.character,
    image: act.profile_path,
  }));
  const director = castData.data.crew
    .filter((per) => per.job === "Director")
    .map((per) => per.name)[0];

  const providersData = await axios(PROVIDERS_URL(media_type, id));
  const providers = providersData.data.results.AR
    ? {
        streaming: [
          ...(providersData.data.results.AR.flatrate || []).map((provider) => ({
            name: provider.provider_name,
            image: provider.logo_path,
          })),
        ],
        buy: [
          ...(providersData.data.results.AR.buy || []).map((provider) => ({
            name: provider.provider_name,
            image: provider.logo_path,
          })),
        ],
        rent: [
          ...(providersData.data.results.AR.rent || []).map((provider) => ({
            name: provider.provider_name,
            image: provider.logo_path,
          })),
        ],
      }
    : {};

  const videosData = await axios(VIDEOS_URL(media_type, id));
  let youtubeVideos = videosData.data.results.filter(
    (vid) => vid.site === "YouTube"
  );
  if (!youtubeVideos.length) youtubeVideos = [];
  else {
    const trailer = youtubeVideos.find((vid) => vid.type === "Trailer");
    youtubeVideos = trailer
      ? [trailer, ...youtubeVideos.filter((vid) => vid !== trailer).slice(0, 3)]
      : youtubeVideos.slice(0, 4);
  }

  const similarData = await axios(SIMILAR_URL(media_type, id));
  const similar = similarData.data.results.map((sim) => ({
    id: sim.id,
    title: media_type === "movie" ? sim.title : sim.name,
    image: sim.poster_path,
    media_type,
    date: media_type === "movie" ? sim.release_date : sim.first_air_date,
  }));

  return {
    ...detailData.data,
    images,
    cast,
    director,
    providers,
    media_type,
    youtubeVideos,
    similar,
  };
};

module.exports = getDetailController;
