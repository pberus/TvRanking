import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../../redux/actions";
import { Carousel } from "../../components";

const Home = () => {
  const dispatch = useDispatch();
  const popularFilms = useSelector((state) => state.popularFilms);

  useEffect(() => {
      dispatch(getFilms())
  }, [dispatch]);
  
  return (
    <div>
      <h1>Tv Ranking</h1>
      <h2>Peliculas mas populares del momento</h2>
      {popularFilms.length ? <Carousel tvArray={popularFilms} /> : null}
    </div>
  );
};

export default Home;
