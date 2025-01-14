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
  } = info;

  countries.registerLocale(es);
  const uncodedCountries = origin_country.map((code) =>
    countries.getName(code, "es")
  );

  const uncodedLanguage = ISO6391.getNativeName(original_language);

  const uncodedProdCountries = production_countries.map((code) =>
    countries.getName(code.iso_3166_1, "es")
  );

  const spokenLanguagesName = spoken_languages.map((lan) => lan.name);

  return (
    <Box
      sx={{
        width: "90%",
        border: 1,
        borderColor: "#e0e0e0",
        marginBottom: 3,
        ".MuiBox-root": {
          paddingBottom: "0",
          paddingLeft: "0",
          paddingRight: "0",
        },
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
        <div className='d-flex justify-content-around'>
          <div>
            <h5>Detalles de la pelicula</h5>
            <p>País/es: {uncodedCountries.join(", ")}</p>
            <p>Idioma original: {uncodedLanguage}</p>
            <p>Idiomas hablados: {spokenLanguagesName.join(", ")}</p>
            <p>Estado: {status}</p>
          </div>
          <div>
            <h5>Compañías productoras</h5>
            {production_companies.map((comp, index) => (
              <p key={index}>
                {comp.name} ({countries.getName(comp.origin_country, "es")})
              </p>
            ))}
          </div>
          <div>
            <h5>País/es de producción</h5>
            <p>{uncodedProdCountries.join(", ")}</p>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {cast?.length > 0 && <DetailCastCarousel cast={cast} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {youtubeVideos?.length > 0 && (
          <YoutubeDetailVideos videos={youtubeVideos} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

TabsDetailInfo.propTypes = {
  info: PropTypes.object.isRequired,
};
