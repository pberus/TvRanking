import PropTypes from "prop-types";
import style from "./listCards.module.css";
import ListCard from "../Card/ListCard";

const ListCards = ({ tvArray }) => {
  return (
    <div className={style.Cards}>
      {tvArray?.map((tv) => (
        <ListCard key={tv.id} tv={tv} />
      ))}
    </div>
  );
};

ListCards.propTypes = {
  tvArray: PropTypes.array.isRequired,
};

export default ListCards;
