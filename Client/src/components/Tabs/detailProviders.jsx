import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import style from "./detailProviders.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

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

export default function TabsDetailProviders({ providers, title }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { streaming, buy, rent } = providers;

  return (
    <Box sx={{ width: "100%", borderTop: 2, borderColor: "#1976d2" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='fullWidth'
        >
          <Tab label='STREAM' {...a11yProps(0)} />
          <Tab label='ALQUILAR' {...a11yProps(1)} />
          <Tab label='COMPRAR' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className='d-flex flex-row w-100'>
          {streaming?.length > 0 ? (
            streaming.map((pro, index) => (
              <div key={index} className={style.streaming}>
                <img
                  src={IMAGE_URL + pro.image}
                  className={`d-block ${style.images}`}
                  alt={`image of ${pro.name}`}
                />
                <p>{pro.name}</p>
              </div>
            ))
          ) : (
            <h6>{title} no esta disponible para streaming en tu region.</h6>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className='d-flex flex-row w-100'>
          {buy?.length > 0 ? (
            buy?.map((pro, index) => (
              <div key={index} className={style.streaming}>
                <img
                  src={IMAGE_URL + pro.image}
                  className={`d-block ${style.images}`}
                  alt={`image of ${pro.name}`}
                />
                <p>{pro.name}</p>
              </div>
            ))
          ) : (
            <h6>{title} no esta disponible para alquilar en tu region.</h6>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className='d-flex flex-row w-100'>
          {rent?.length > 0 ? (
            rent?.map((pro, index) => (
              <div key={index} className={style.streaming}>
                <img
                  src={IMAGE_URL + pro.image}
                  className={`d-block ${style.images}`}
                  alt={`image of ${pro.name}`}
                />
                <p>{pro.name}</p>
              </div>
            ))
          ) : (
            <h6>{title} no esta disponible para comprar en tu region.</h6>
          )}
        </div>
      </CustomTabPanel>
    </Box>
  );
}

TabsDetailProviders.propTypes = {
  providers: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
