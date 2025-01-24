import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ListCards from "../Cards/ListCards";
import { TvOff } from "@mui/icons-material";

const InfiniteScrollLists = ({ items, totalPages, setPageList }) => {
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (page > totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [page, totalPages]);

  const fetchData = () => {
    if (page <= totalPages) {
      setPageList(page);
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <div
            style={{
              color: "white",
              paddingTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <TvOff sx={{ fontSize: 60 }} />
            <b>¡Llegaste al final de la lista!</b>
            <a href='/popular' className='btn btn-light'>
              Sigue explorando
            </a>
          </div>
        }
      >
        <ListCards tvArray={items} />
      </InfiniteScroll>
    </div>
  );
};

InfiniteScrollLists.propTypes = {
  items: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPageList: PropTypes.func.isRequired,
};

export default InfiniteScrollLists;
