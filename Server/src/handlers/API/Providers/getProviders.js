const getApiProvidersController = require("../../../controllers/API/Providers/getProviders");

const getApiProvidersHandler = async (req, res) => {
  try {
    let { filmsProviders, seriesProviders } = await getApiProvidersController();

    filmsProviders = filmsProviders?.map(
      ({ provider_id, provider_name, logo_path }) => ({
        id: provider_id,
        name: provider_name,
        img: logo_path,
      })
    );

    seriesProviders = seriesProviders?.map(
      ({ provider_id, provider_name, logo_path }) => ({
        id: provider_id,
        name: provider_name,
        img: logo_path,
      })
    );
    return res.json({ filmsProviders, seriesProviders });
  } catch (error) {
    console.log("error providers: ", error.message);
  }
};

module.exports = getApiProvidersHandler;
