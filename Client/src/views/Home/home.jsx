import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiringTodaySeries,
  getNowPlayingFilms,
  getOnTheAirSeries,
  getPopularFilms,
  getPopularSeries,
  getTopRatedFilms,
  getTopRatedSeries,
  getUpcomingFilms,
} from "../../redux/actions";
import { HomeCarousel } from "../../components";

const Home = () => {
  const [filmsOrSeries, setFilmsOrSeries] = useState(true);
  const dispatch = useDispatch();

  //films
  const nowPlayingFilms = useSelector((state) => state.nowPlayingFilms);
  const popularFilms = useSelector((state) => state.popularFilms);
  const topRatedFilms = useSelector((state) => state.topRatedFilms);
  const upcomingFilms = useSelector((state) => state.upcomingFilms);

  //series
  const airingTodaySeries = useSelector((state) => state.airingTodaySeries);
  const onTheAirSeries = useSelector((state) => state.onTheAirSeries);
  const popularSeries = useSelector((state) => state.popularSeries);
  const topRatedSeries = useSelector((state) => state.topRatedSeries);

  useEffect(() => {
    if (filmsOrSeries) {
      dispatch(getNowPlayingFilms());
      dispatch(getPopularFilms());
      dispatch(getTopRatedFilms());
      dispatch(getUpcomingFilms());
    } else {
      dispatch(getAiringTodaySeries());
      dispatch(getOnTheAirSeries());
      dispatch(getPopularSeries());
      dispatch(getTopRatedSeries());
    }
  }, [dispatch, filmsOrSeries]);

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
            <HomeCarousel tvArray={nowPlayingFilms} position='1' />
          )}
          <h2>Mas populares del momento</h2>
          {popularFilms.length > 0 && (
            <HomeCarousel tvArray={popularFilms} position='2' />
          )}
          <h2>Mejor calificadas</h2>
          {topRatedFilms.length > 0 && (
            <HomeCarousel tvArray={topRatedFilms} position='3' />
          )}
          <h2>Proximamente</h2>
          {upcomingFilms.length > 0 && (
            <HomeCarousel tvArray={upcomingFilms} position='4' />
          )}
        </>
      ) : (
        <>
          <h2>Se estrenan hoy...</h2>
          {airingTodaySeries.length > 0 && (
            <HomeCarousel tvArray={airingTodaySeries} position='1' />
          )}
          <h2>Mas populares del momento</h2>
          {popularSeries.length > 0 && (
            <HomeCarousel tvArray={popularSeries} position='2' />
          )}
          <h2>Mejor calificadas</h2>
          {topRatedSeries.length > 0 && (
            <HomeCarousel tvArray={topRatedSeries} position='3' />
          )}
          <h2>Proximamente</h2>
          {onTheAirSeries.length > 0 && (
            <HomeCarousel tvArray={onTheAirSeries} position='4' />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
