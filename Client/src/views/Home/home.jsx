import { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import { useDispatch } from "react-redux";
import { getFilms } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getFilms())
  }, [dispatch])


  return (
    <div>
      <h1>Tv Ranking</h1>
      <h2>Most popular films</h2>
      <Cards />
    </div>
  );
};

export default Home;
