import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingFilms,
  getPopularFilms,
  getTopRatedFilms,
  getUpcomingFilms,
} from "../../redux/actions";
import { Carousel } from "../../components";

const Home = () => {
  const [filmsOrSeries, setFilmsOrSeries] = useState(true);

  const dispatch = useDispatch();
  const nowPlayingFilms = useSelector((state) => state.nowPlayingFilms);
  const popularFilms = useSelector((state) => state.popularFilms);
  const topRatedFilms = useSelector((state) => state.topRatedFilms);
  const upcomingFilms = useSelector((state) => state.upcomingFilms);

  useEffect(() => {
    dispatch(getNowPlayingFilms());
    dispatch(getPopularFilms());
    dispatch(getTopRatedFilms());
    dispatch(getUpcomingFilms());
  }, [dispatch]);

  return (
    <div>
      <h1>Tv Ranking</h1>
      <button
        className={`btn ${filmsOrSeries ? "btn-primary" : "btn-secondary"}`}
        disabled={filmsOrSeries}
        onClick={() => setFilmsOrSeries(true)}
      >
        Peliculas
      </button>
      <button
        className={`btn ${!filmsOrSeries ? "btn-primary" : "btn-secondary"}`}
        disabled={!filmsOrSeries}
        onClick={() => setFilmsOrSeries(false)}
      >
        Series
      </button>
      {filmsOrSeries ? (
        <>
          <h2>En cines</h2>
          {nowPlayingFilms.length > 0 && (
            <Carousel tvArray={nowPlayingFilms} position='1' />
          )}
          <h2>Mas populares del momento</h2>
          {popularFilms.length > 0 && (
            <Carousel tvArray={popularFilms} position='2' />
          )}
          <h2>Mejor calificadas</h2>
          {topRatedFilms.length > 0 && (
            <Carousel tvArray={topRatedFilms} position='3' />
          )}
          <h2>Proximamente</h2>
          {upcomingFilms.length > 0 && (
            <Carousel tvArray={upcomingFilms} position='4' />
          )}
        </>
      ) : (
        <h2>Mostrando las series</h2>
      )}
    </div>
  );
};

export default Home;
