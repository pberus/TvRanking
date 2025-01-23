import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiringTodaySeries,
  getAllLists,
  getNowPlayingFilms,
  getOnTheAirSeries,
  getPopularFilms,
  getPopularSeries,
  getTopRatedFilms,
  getTopRatedSeries,
  getTrending,
  getUpcomingFilms,
} from "../../redux/actions";
import { HomeCarousel, TrendingCarousel } from "../../components";
import logo from "../../assets/logotipo_tv_ranking.png";
import { Start, GitHub, Work, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [filmsOrSeries, setFilmsOrSeries] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated && dispatch(getAllLists());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (filmsOrSeries) {
      dispatch(getTrending("movie"));
      dispatch(getNowPlayingFilms());
      dispatch(getPopularFilms());
      dispatch(getTopRatedFilms());
      dispatch(getUpcomingFilms());
    } else {
      dispatch(getTrending("tv"));
      dispatch(getAiringTodaySeries());
      dispatch(getOnTheAirSeries());
      dispatch(getPopularSeries());
      dispatch(getTopRatedSeries());
    }
    setLoading(false);
  }, [dispatch, filmsOrSeries]);

  const myRef = useRef(null);

  const scrollToSection = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div>
        <h4>Cargando inicio...</h4>; // Muestra un mensaje de carga
      </div>
    );
  }

  return (
    <div className='text-white'>
      <TrendingCarousel />
      <div className='pt-3 pb-3 ps-5 pe-5 text-center d-flex flex-column gap-3 align-items-center bg-dark'>
        <h1 style={{ display: "none" }}>Tv Ranking</h1>
        <img
          src={logo}
          alt='logo tv ranking'
          height='150'
          width='150'
          className='p-1'
        />
        <p>
          <span className='fs-3'>
            ¡Descubre una nueva forma de explorar el mundo del cine y las
            series!
          </span>
          <br />
          Nuestra página te permite descubrir los títulos más populares y las
          joyas ocultas, buscar tus películas y series favoritas con facilidad,
          y organizar todo en listas personalizadas para que nunca pierdas de
          vista lo que quieres ver y lo que ya viste. <br /> Desde los últimos
          estrenos hasta clásicos imperdibles, aquí tienes todo lo que necesitas
          para disfrutar al máximo del entretenimiento. <br />
          <span className='fs-4'>
            ¡Tu próxima aventura en la pantalla está a solo un clic!
          </span>
        </p>
        <div className='d-flex align-items-center gap-3'>
          <button
            className='p-3 border rounded-5 fw-bold bg-dark text-white'
            onClick={scrollToSection}
          >
            Descubre peliculas y series
          </button>
          <button className='p-3 border rounded-5 fw-bold'>
            <span className='pe-2' onClick={() => navigate("/popular")}>
              Popular
            </span>
            <Start />
          </button>
          <button className='p-3 border rounded-5 fw-bold'>
            <span className='pe-2' onClick={() => navigate("/listas")}>
              Listas
            </span>
            <Start />
          </button>
        </div>
      </div>
      <div ref={myRef} className='p-3'>
        <div className='mb-2'>
          <button
            className="btn btn-dark border rounded-0 rounded-start"
            disabled={filmsOrSeries}
            onClick={() => setFilmsOrSeries(true)}
          >
            Peliculas
          </button>
          <button
            className="btn btn-dark border rounded-0 rounded-end"
            disabled={!filmsOrSeries}
            onClick={() => setFilmsOrSeries(false)}
          >
            Series
          </button>
        </div>
        {filmsOrSeries ? (
          <>
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Mas populares del momento
            </h2>
            {nowPlayingFilms.length > 0 ? (
              <HomeCarousel tvArray={popularFilms} position='1' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              En cartelera
            </h2>
            {popularFilms.length > 0 ? (
              <HomeCarousel tvArray={nowPlayingFilms} position='2' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Mejor calificadas
            </h2>
            {topRatedFilms.length > 0 ? (
              <HomeCarousel tvArray={topRatedFilms} position='3' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Proximamente
            </h2>
            {upcomingFilms.length > 0 ? (
              <HomeCarousel tvArray={upcomingFilms} position='4' />
            ) : (
              <h4>LOADING...</h4>
            )}
          </>
        ) : (
          <>
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Mas populares del momento
            </h2>
            {airingTodaySeries.length > 0 ? (
              <HomeCarousel tvArray={popularSeries} position='1' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Se estrenan hoy...
            </h2>
            {popularSeries.length > 0 ? (
              <HomeCarousel tvArray={airingTodaySeries} position='2' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Mejor calificadas
            </h2>
            {topRatedSeries.length > 0 ? (
              <HomeCarousel tvArray={topRatedSeries} position='3' />
            ) : (
              <h4>LOADING...</h4>
            )}
            <h2 className='p-3' style={{ fontFamily: "fantasy" }}>
              Proximamente
            </h2>
            {onTheAirSeries.length > 0 ? (
              <HomeCarousel tvArray={onTheAirSeries} position='4' />
            ) : (
              <h4>LOADING...</h4>
            )}
          </>
        )}
      </div>
      <footer className='d-flex flex-wrap justify-content-center align-items-center py-3 bg-dark'>
        <div className='col-md-4 d-flex align-items-center'>
          <a
            href='/'
            className='mb-3 me-2 ms-5 mb-md-0 text-decoration-none lh-1'
          >
            <img
              src={logo}
              alt='logo tv ranking'
              height='50'
              width='50'
              className='p-1'
            />
          </a>
          <span className='mb-3 mb-md-0'>Pedro Berustein, 2025</span>
        </div>

        <ul className='nav col-md-4 justify-content-end d-flex me-5'>
          <li className='ms-3'>
            <a
              href='https://pedroberustein.netlify.app/'
              target='blank'
              style={{ color: "white" }}
            >
              <Work color='inherit' />
            </a>
          </li>
          <li className='ms-3'>
            <a
              href='https://www.linkedin.com/in/pedro-berustein/'
              target='blank'
              style={{ color: "white" }}
            >
              <LinkedIn color='inherit' />
            </a>
          </li>
          <li className='ms-3'>
            <a
              href='https://github.com/pberus'
              target='blank'
              style={{ color: "white" }}
            >
              <GitHub color='inherit' />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
