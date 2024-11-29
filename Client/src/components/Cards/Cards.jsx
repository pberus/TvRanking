import PropTypes from "prop-types"
import Card from "../Card/card";
import style from "./cards.module.css"

const Cards = ({tvArray}) => {
  return (
    <div className={style.Cards}>
      {tvArray?.map((tv) => (
        <Card key={tv.id} tv={tv} />
      ))}
    </div>
  );
};

Cards.propTypes = {
  tvArray: PropTypes.array.isRequired,
}

export default Cards;
