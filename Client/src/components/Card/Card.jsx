import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addCardList } from "../../redux/actions";
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
  console.log(isInList);
  
  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);
  const allLists = [...watchlist, ...seen, ...liked];
    console.log(allLists);

  useEffect(() => {
    //TOOLTIPS
    // Eliminar los tooltips existentes antes de crear nuevos
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      // eslint-disable-next-line no-undef
      const tooltip = bootstrap.Tooltip.getInstance(tooltipTriggerEl); // Obtener la instancia del tooltip
      if (tooltip) {
        tooltip.dispose(); // Destruir el tooltip existente
      }
      // eslint-disable-next-line no-undef
      new bootstrap.Tooltip(tooltipTriggerEl); // Crear un nuevo tooltip
    });
  }, [isInList]); // Dependencia para actualizar tooltips cuando isInList cambie

  useEffect(() => {
    watchlist.forEach((tv) => {
      if (tv.id === id) {
        setIsInList({
          ...isInList,
          [tv.list_type]: true,
        });
      }
    });
    seen.forEach((tv) => {
      if (tv.id === id) {
        setIsInList({
          ...isInList,
          [tv.list_type]: true,
        });
      }
    });
    liked.forEach((tv) => {
      if (tv.id === id) {
        setIsInList({
          ...isInList,
          [tv.list_type]: true,
        });
      }
    });
  }, [watchlist, seen, liked]);

  const handleList = (list) => {
    if (isInList[list]) {
      setIsInList({
        ...isInList,
        [list]: false,
      });
      //dispatch(removeCardList(id));
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
        <button
          className={style.iconsButton}
          onClick={() => handleList("watchlist")}
          data-bs-toggle='tooltip'
          data-bs-placement='bottom'
          data-bs-title={`${isInList.watchlist ? "Watchlist" : "Watchlist"}`}
        >
          <BookmarkIcon
            className={`${style.icon} ${isInList.watchlist && "text-warning"}`}
          />
        </button>
        <button
          className={style.iconsButton}
          onClick={() => handleList("seen")}
          data-bs-toggle='tooltip'
          data-bs-placement='bottom'
          data-bs-title={`${isInList.seen ? "No visto" : "Visto"}`}
        >
          <DoneIcon
            className={`${style.icon} ${isInList.seen && "text-warning"}`}
          />
        </button>
        <button
          className={style.iconsButton}
          onClick={() => handleList("liked")}
          data-bs-toggle='tooltip'
          data-bs-placement='bottom'
          data-bs-title={`${
            isInList.liked ? "Eliminar de me gusta" : "Me gusta"
          }`}
        >
          <ThumbUpIcon
            className={`${style.icon} ${isInList.liked && "text-warning"}`}
          />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
};

export default Card;
