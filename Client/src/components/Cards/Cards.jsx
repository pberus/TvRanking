import { useSelector } from "react-redux";
import Card from "../Card/card";

const Cards = () => {
  const films = useSelector((state) => state.films);
  return (
    <div>
      {films?.map((film) => (
        <Card key={film.id} film={film} />
      ))}
    </div>
  );
};

export default Cards;
