import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DetailCastCarousel from "../Carousel/detailCast";
import YoutubeDetailVideos from "../Youtube/detailVideos";
import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";
import ISO6391 from "iso-639-1";
import DetailSimilarCarousel from "../Carousel/detailSimilar";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsDetailInfo({ info }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    cast,
    production_companies,
    production_countries,
    original_language,
    origin_country,
    spoken_languages,
    status,
    youtubeVideos,
    similar,
  } = info;

  countries.registerLocale(es);
  const uncodedCountries =
    origin_country?.length > 0
      ? origin_country.map((code) => countries.getName(code, "es"))
      : [];

  const uncodedLanguage = ISO6391.getNativeName(original_language);

  const spokenLanguagesName =
    spoken_languages?.length > 0 ? spoken_languages.map((lan) => lan.name) : [];

  const uncodedProdCountries =
    production_countries?.length > 0
      ? production_countries.map((code) =>
          countries.getName(code.iso_3166_1, "es")
        )
      : [];

  return (
    <Box
      sx={{
        width: "90%",
        border: 1,
        borderColor: "#e0e0e0",
        marginBottom: 3,
        marginTop: 3,
        ".MuiBox-root": {
          padding: "0",
        },
        backgroundColor: "white",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='fullWidth'
        >
          <Tab label='Detalles' {...a11yProps(0)} />
          <Tab label='Elenco' {...a11yProps(1)} />
          <Tab label='Videos' {...a11yProps(2)} />
          <Tab label='Relacionadas' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className='d-flex justify-content-around mt-3'>
          <div>
            <h5>Detalles de la pelicula</h5>
            {uncodedCountries.length > 0 && (
              <p>País/es: {uncodedCountries.join(", ")}</p>
            )}
            {uncodedLanguage && <p>Idioma original: {uncodedLanguage}</p>}
            {spokenLanguagesName.length > 0 && (
              <p>Idiomas hablados: {spokenLanguagesName.join(", ")}</p>
            )}
            {status && <p>Estado: {status}</p>}
          </div>
          {production_companies?.length > 0 && (
            <div>
              <h5>Compañías productoras</h5>
              {production_companies.map((comp, index) => (
                <p key={index}>
                  {comp.name} ({countries.getName(comp.origin_country, "es")})
                </p>
              ))}
            </div>
          )}
          {uncodedProdCountries.length > 0 && (
            <div>
              <h5>País/es de producción</h5>
              <p>{uncodedProdCountries.join(", ")}</p>
            </div>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {cast?.length > 0 ? (
          <DetailCastCarousel cast={cast} />
        ) : (
          <h5 className='ps-3'>No se encuentra disponible el elenco.</h5>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {youtubeVideos?.length > 0 ? (
          <YoutubeDetailVideos videos={youtubeVideos} />
        ) : (
          <h5 className='ps-3'>
            No se encuentran disponibles videos relacionados.
          </h5>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {similar?.length > 0 ? (
          <DetailSimilarCarousel similar={similar} />
        ) : (
          <h5 className='ps-3'>
            No se encuentran disponibles peliculas relacionadas.
          </h5>
        )}
      </CustomTabPanel>
    </Box>
  );
}

TabsDetailInfo.propTypes = {
  info: PropTypes.object.isRequired,
};
