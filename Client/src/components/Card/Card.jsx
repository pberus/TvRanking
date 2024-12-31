import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Tooltip from "@mui/material/Tooltip";
import { addCardList, removeCardList } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv }) => {
  const { id, title, image } = tv;

  const [isInList, setIsInList] = useState({
    watchlist: false,
    seen: false,
    liked: false,
  });

  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);

  useEffect(() => {
    const updatedList = { ...isInList };
    watchlist.forEach((tv) => {
      if (tv.id === id) {
        updatedList[tv.list_type] = true;
      }
    });
    seen.forEach((tv) => {
      if (tv.id === id) {
        updatedList[tv.list_type] = true;
      }
    });
    liked.forEach((tv) => {
      if (tv.id === id) {
        updatedList[tv.list_type] = true;
      }
    });
    setIsInList(updatedList);
  }, [watchlist, seen, liked]);

  const handleList = (list) => {
    if (isInList[list]) {
      setIsInList({
        ...isInList,
        [list]: false,
      });
      dispatch(removeCardList({ id, list }));
    } else {
      setIsInList({
        ...isInList,
        [list]: true,
      });
      let obj = { ...tv };
      obj.list_type = list;
      dispatch(addCardList(obj));
    }
  };

  return (
    <div className={style.Card}>
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
};

export default Card;
