import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Tooltip from "@mui/material/Tooltip";
import { addCardList, removeCardList } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv, cardStyle }) => {
  const { id, title, image, media_type } = tv;

  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);

  const isInList = {
    watchlist: watchlist.some((item) => item.id === id),
    seen: seen.some((item) => item.id === id),
    liked: liked.some((item) => item.id === id),
  };

  const handleList = (list) => {
    if (isInList[list]) {
      dispatch(removeCardList({ id, list }));
    } else {
      dispatch(addCardList({ id, list, media_type }));
    }
  };

  return (
    <div className={`${style.Card} ${cardStyle && style.listCard}`}>
      <img src={image ? IMAGE_URL + image : noImageAvailable} alt={title} />
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
            <DoneIcon
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
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
  cardStyle: PropTypes.bool,
};

export default Card;
