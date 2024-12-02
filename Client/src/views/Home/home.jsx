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
      <h2>En cines</h2>
      {nowPlayingFilms.length ? (
        <Carousel tvArray={nowPlayingFilms} position='1' />
      ) : null}
      <h2>Mas populares del momento</h2>
      {popularFilms.length ? (
        <Carousel tvArray={popularFilms} position='2' />
      ) : null}
      <h2>Mejor calificadas</h2>
      {topRatedFilms.length ? (
        <Carousel tvArray={topRatedFilms} position='3' />
      ) : null}
      <h2>Proximamente</h2>
      {upcomingFilms.length ? (
        <Carousel tvArray={upcomingFilms} position='4' />
      ) : null}
    </div>
  );
};

export default Home;
