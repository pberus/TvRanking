import PropTypes from "prop-types";
import style from "./card.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv }) => {
  const { title, image, media_type } = tv;
  return (
    <div className={style.Card}>
      <img src={IMAGE_URL + image} alt={`img of ${title}`} />
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
};

export default Card;
