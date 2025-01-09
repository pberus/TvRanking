import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TvIcon from "@mui/icons-material/Tv";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfiniteScrollLists from "../InfiniteScroll/lists";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ToolbarLists from "../Toolbar/lists";

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

export default function TabsLists() {
  const [value, setValue] = useState(0);
  //si el value es 0 = watchlist, 1 = seen, 2 = liked

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPageList(1);
  };

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);  

  const [pageList, setPageList] = useState(1);
  const [list, setList] = useState({
    watchlist: [],
    seen: [],
    liked: [],
  });

  useEffect(() => {
    const sliceList = (list) => {
      return list.slice(0, pageList * 20);
    };

    setList({
      watchlist: sliceList(watchlist),
      seen: sliceList(seen),
      liked: sliceList(liked),
    });
  }, [pageList, watchlist, seen, liked]);

  const totalPages = (list) => {
    return Math.ceil(list.length / 20);
  };

  let totalResults = 0;
  if (value === 0) totalResults = watchlist.length;
  else if (value === 1) totalResults = seen.length;
  else totalResults = liked.length;

  return (
    <Box
      sx={{
        ".MuiBox-root": {
          padding: "5px",
        },
        width: "100%",
      }}
    >
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
      <ToolbarLists
        list={Object.keys(list)[value]}
        totalResults={totalResults}
      />
      <CustomTabPanel value={value} index={0}>
        {list.watchlist.length > 0 && (
          <InfiniteScrollLists
            items={list.watchlist}
            totalPages={totalPages(watchlist)}
            setPageList={setPageList}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {list.seen.length > 0 && (
          <InfiniteScrollLists
            items={list.seen}
            totalPages={totalPages(seen)}
            setPageList={setPageList}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {list.liked.length > 0 && (
          <InfiniteScrollLists
            items={list.liked}
            totalPages={totalPages(liked)}
            setPageList={setPageList}
          />
        )}
      </CustomTabPanel>
    </Box>
  );
}
