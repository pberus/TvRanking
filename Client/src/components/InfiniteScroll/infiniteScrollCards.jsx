import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Cards from "../Cards/cards";

const InfiniteScrollCards = ({ items, totalPages, setDiscover, discover }) => {
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    discover.page === "" && setPage(2);
  }, [discover.page]);

  useEffect(() => {
    if (page > totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [page, totalPages]);

  const fetchData = () => {
    if (page <= totalPages) {
      setDiscover({
        ...discover,
        page,
      });
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
          <p style={{ textAlign: "center" }}>
            <b>¡Lo sentimos! No hay mas contenido para mostrar.</b>
          </p>
        }
      >
        <Cards tvArray={items} />
      </InfiniteScroll>
    </div>
  );
};

InfiniteScrollCards.propTypes = {
  items: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  setDiscover: PropTypes.func.isRequired,
  discover: PropTypes.object.isRequired,
};

export default InfiniteScrollCards;
