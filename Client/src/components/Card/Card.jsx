import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { LiveTv, Movie, Done } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Tooltip from "@mui/material/Tooltip";
import {
  addCardList,
  openNotAuthenticateListsModal,
  removeCardList,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv, cardStyle }) => {
  const { id, title, image, media_type, date } = tv;

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);

  const isInList = {
    watchlist: watchlist.some((item) => item.id === id),
    seen: seen.some((item) => item.id === id),
    liked: liked.some((item) => item.id === id),
  };

  const handleList = (list) => {
    if (isAuthenticated.authenticated) {
      if (isInList[list]) {
        dispatch(removeCardList({ id, list }));
      } else {
        dispatch(addCardList({ id, list, media_type }));
      }
    } else {
      dispatch(openNotAuthenticateListsModal(true));
    }
  };

  const slugTitle = title
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9áéíóúüñ-]+/gi, "");

  return (
    <div className={`${style.Card} ${cardStyle && style.listCard}`}>
      <Link
        to={`/${media_type === "movie" ? "pelicula" : "serie"}/${slugTitle}-${
          date.split("-")[0]
        }`}
      >
        <img
          src={image ? IMAGE_URL + image : noImageAvailable}
          alt={title}
          className={`${!cardStyle && "rounded"}`}
        />
      </Link>
      <div className={style.icons}>
        <Tooltip arrow title='Watchlist'>
          <button
            className={`${style.iconsButton} ${
              isInList.watchlist && "opacity-100"
            }`}
            onClick={() => handleList("watchlist")}
          >
            <BookmarkIcon
              className={`${style.icon} ${
                isInList.watchlist && "text-warning"
              }`}
            />
          </button>
        </Tooltip>
        <Tooltip arrow title={`${isInList.seen ? "No visto" : "Visto"}`}>
          <button
            className={`${style.iconsButton} ${isInList.seen && "opacity-100"}`}
            onClick={() => handleList("seen")}
          >
            <Done
              className={`${style.icon} ${isInList.seen && "text-warning"}`}
            />
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title={`${isInList.liked ? "Eliminar de me gusta" : "Me gusta"}`}
        >
          <button
            className={`${style.iconsButton} ${
              isInList.liked && "opacity-100"
            }`}
            onClick={() => handleList("liked")}
          >
            <ThumbUpIcon
              className={`${style.icon} ${isInList.liked && "text-warning"}`}
            />
          </button>
        </Tooltip>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "white",
          bottom: "6%",
          left: "10%",
          padding: 1,
          borderRadius: "30%",
        }}
      >
        {media_type === "movie" ? (
          <Movie color='inherit' sx={{ opacity: "85%" }} />
        ) : (
          <LiveTv color='inherit' sx={{ opacity: "85%" }} />
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
  cardStyle: PropTypes.bool,
};

export default Card;
