const axios = require("axios");

const { API_KEY } = process.env;
const PROVIDERS_URL = `https://api.themoviedb.org/3/watch/providers/`;

const getApiProvidersController = async () => {
  const filmsProviders = await axios(
    PROVIDERS_URL + `movie?api_key=${API_KEY}&language=en-US&watch_region=AR`
  );
  const seriesProviders = await axios(
    PROVIDERS_URL + `movie?api_key=${API_KEY}&language=en-US&watch_region=AR`
  );
  return {
    filmsProviders: filmsProviders.data.results,
    seriesProviders: seriesProviders.data.results,
  };
};

module.exports = getApiProvidersController;
