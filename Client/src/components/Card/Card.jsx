import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv }) => {
  const { title, image } = tv;
  return (
    <div className={style.Card}>
      <img src={image ? IMAGE_URL + image : noImageAvailable} alt={title} />
      <div className={style.icons}>
        <button className={style.iconsButton}>
          <BookmarkIcon className={style.icon} />
        </button>
        <button className={style.iconsButton}>
          <DoneIcon className={style.icon} />
        </button>
        <button className={style.iconsButton}>
          <ThumbUpIcon className={style.icon} />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
};

export default Card;
