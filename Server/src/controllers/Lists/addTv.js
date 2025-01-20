const { Watchlist, Seen, Liked } = require("../../db");
const axios = require("axios");

const { API_KEY } = process.env;
const URL = (id, media) =>
  `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&language=es-AR&append_to_response=watch%2Fproviders`;

const addTvListController = async (id, list, media_type, userId) => {
  const { data } = await axios(URL(id, media_type));
  const {
    title,
    overview,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    homepage,
    popularity,
    original_language,
    genres,
    runtime,
    revenue,
    name,
    first_air_date,
    episode_run_time,
  } = data;
  const { results } = data["watch/providers"];

  // Paso 1: Iterar sobre cada propiedad del objeto
  const providerIds =
    results.AR &&
    Object.values(results.AR).reduce((ids, value) => {
      // Paso 2: Verificar si la propiedad es un array
      if (Array.isArray(value)) {
        // Paso 3: Extraer los provider_id de cada elemento del array
        const idsFromArray = value.map((item) => item.provider_id);
        return ids.concat(idsFromArray); // Agregar los ids al array final
      }
      return ids;
    }, []);

  let model = Watchlist;
  if (list === "seen") model = Seen;
  if (list === "liked") model = Liked;

  const [tv, created] = await model.findOrCreate({
    where: { id, UserId: userId }, // Busca solo por ID
    defaults: {
      title: media_type === "movie" ? title : name,
      overview: overview ? overview : "No description available",
      image: poster_path ? poster_path : null,
      date: media_type === "movie" ? release_date : first_air_date,
      rating: vote_average,
      media_type,
      list_type: list,
      genres: genres.map((gen) => gen.id),
      homepage,
      lenguage: original_language,
      popularity,
      vote_count,
      runtime:
        media_type === "movie"
          ? runtime
          : episode_run_time.length > 0
          ? episode_run_time.reduce((sum, time) => sum + time, 0) /
            episode_run_time.length
          : 0,
      revenue: revenue ? revenue : 0,
      providers: providerIds?.length > 0 ? providerIds : null,
    }, // Valores por defecto
  });

  if (!created) throw new Error("The title already exists!");

  const allTv = await model.findAll({
    where: {
      UserId: userId,
    },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return { allTv, title: media_type === "movie" ? title : name };
};

module.exports = addTvListController;
