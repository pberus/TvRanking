import PropTypes from "prop-types";
import style from "./card.module.css";
import noImageAvailable from "../../assets/no_image_available.jpg"

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Card = ({ tv }) => {
  const { title, image } = tv;
  return (
    <div className={style.Card}>
      <img src={image ? IMAGE_URL + image : noImageAvailable} alt={title} />
    </div>
  );
};

Card.propTypes = {
  tv: PropTypes.object.isRequired,
};

export default Card;
