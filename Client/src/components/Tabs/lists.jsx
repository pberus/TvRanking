import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TvIcon from "@mui/icons-material/Tv";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfiniteScrollCards from "../InfiniteScroll/infiniteScrollCards";

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

export default function TabsLists({ watchList, seen, liked }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab
            label='Watchlist'
            icon={<TvIcon />}
            iconPosition='end'
            {...a11yProps(0)}
          />
          <Tab
            label='Visto'
            icon={<DoneOutlineIcon />}
            iconPosition='end'
            {...a11yProps(1)}
          />
          <Tab
            label='Me gusta'
            icon={<FavoriteIcon />}
            iconPosition='end'
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InfiniteScrollCards
          items={watchList}
          totalPages={1}
          setDiscover={setDiscover}
          discover={discover}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

TabsLists.propTypes = {
  watchList: PropTypes.array.isRequired,
  seen: PropTypes.array.isRequired,
  liked: PropTypes.array.isRequired,
};
