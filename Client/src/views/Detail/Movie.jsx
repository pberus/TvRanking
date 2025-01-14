import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addCardList,
  getDetail,
  removeCardList,
  removeDetail,
} from "../../redux/actions";
import noImageAvailable from "../../assets/no_image_available.jpg";
import {
  DetailImagesCarousel,
  TabsDetailInfo,
  TabsDetailProviders,
} from "../../components";
import {
  CalendarToday,
  AccessTime,
  Paid,
  LocalAtm,
  Grade,
  MovieCreation,
  Share,
  Bookmark,
  Done,
  ThumbUp,
  Language,
} from "@mui/icons-material";
import tmdbIcono from "../../assets/tmdb-logo.svg";
import style from "./movie.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);
  console.log("detail:", detail);
  const {
    id,
    media_type,
    title,
    poster_path,
    original_title,
    images,
    cast,
    genres,
    overview,
    release_date,
    runtime,
    revenue,
    budget,
    vote_average,
    director,
    providers,
    homepage,
    production_companies,
    production_countries,
    original_language,
    origin_country,
    spoken_languages,
    status,
    youtubeVideos,
    similar,
  } = detail;

  useEffect(() => {
    setLoading(true); // Reinicia el estado de carga al cambiar el slug
    dispatch(getDetail(slug, "movie")).then(() => {
      setLoading(false); // Cambia el estado a false cuando los datos estén listos
    });

    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, slug]); // Agrega slug como dependencia

  const watchlist = useSelector((state) => state.watchlist);
  const seen = useSelector((state) => state.seen);
  const liked = useSelector((state) => state.liked);

  const isInList = {
    watchlist: watchlist.some((item) => item.id === id),
    seen: seen.some((item) => item.id === id),
    liked: liked.some((item) => item.id === id),
  };

  const handleList = (list) => {
    if (isInList[list]) {
      dispatch(removeCardList({ id, list }));
    } else {
      dispatch(addCardList({ id, list, media_type }));
    }
  };

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <h4 className='ms-3'>Cargando detalles de la película...</h4>; // Muestra un mensaje de carga
  }

  if (typeof detail === "string") {
    return <h4 className='ms-3'>{detail}</h4>; // Muestra un mensaje de error
  }

  return (
    <div>
      <div className={style.start}>
        <div className={style.startPoster}>
          <img
            src={
              poster_path === null ? noImageAvailable : IMAGE_URL + poster_path
            }
            alt={title}
            className={style.poster}
          />
          <div className={style.listIcons}>
            <button
              className={`${style.listIcon} ${
                isInList.watchlist && "text-warning"
              }`}
              onClick={() => handleList("watchlist")}
            >
              <Bookmark />
              Watchlist
            </button>
            <button
              className={`${style.listIcon} ${isInList.seen && "text-warning"}`}
              onClick={() => handleList("seen")}
            >
              <Done />
              Visto
            </button>
            <button
              className={`${style.listIcon} ${
                isInList.liked && "text-warning"
              }`}
              onClick={() => handleList("liked")}
            >
              <ThumbUp />
              Me gusta
            </button>
          </div>
        </div>
        <div className={style.startInfo}>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-baseline'>
              <h2>{title}</h2>
              <p className='fs-4 ms-1'>
                ({new Date(release_date).getFullYear()})
              </p>
            </div>
            <div>
              {homepage && (
                <button className='me-2'>
                  <Link to={homepage} target='blank'>
                    <Language />
                  </Link>
                </button>
              )}
              <button>
                <Share />
              </button>
            </div>
          </div>
          {original_title && original_title !== title && (
            <h4 className='text-secondary'>
              Titulo original: {original_title}
            </h4>
          )}
          {genres?.length > 0 && (
            <div className='d-flex mt-3'>
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className='badge rounded-pill text-body-emphasis bg-body-secondary fw-medium me-2'
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <p className='text-secondary mt-3'>{overview}</p>
          <div
            className='d-flex align-items-center flex-wrap'
            style={{ gap: "1rem" }}
          >
            <div className='d-flex align-items-center'>
              <CalendarToday className='me-1' />
              <b className='me-2'>Fecha de estreno: </b>
              {new Date(release_date + "T00:00:00").toLocaleDateString("es-AR")}
            </div>
            <div className='d-flex align-items-center'>
              <AccessTime className='me-1' />
              <b className='me-2'>Duración: </b>
              {runtime <= 60
                ? `${runtime} min`
                : `${Math.floor(runtime / 60)}h ${Math.ceil(
                    (runtime / 60 - 1) * 60
                  )}min`}
            </div>
            <div className='d-flex align-items-center'>
              <Grade className='me-1' />
              <b className='me-2'>Calificación: </b>
              {vote_average.toFixed(2)}
              <img
                src={tmdbIcono}
                alt='tmdb-logo'
                width='60'
                className='ms-2'
              />
            </div>
            <div className='d-flex align-items-center'>
              <MovieCreation className='me-1' />
              <b className='me-2'>Director/a: </b>
              {director}
            </div>
            <div className='d-flex align-items-center'>
              <LocalAtm className='me-1' />
              <b className='me-2'>Recaudación: </b>$
              {revenue.toLocaleString("es-AR")}
            </div>
            <div className='d-flex align-items-center'>
              <Paid className='me-1' />
              <b className='me-2'>Presupuesto: </b>$
              {budget.toLocaleString("es-AR")}
            </div>
          </div>
          <div className={`mt-3 ${style.providers}`}>
            <h5 className='p-3'>Dónde ver</h5>
            <TabsDetailProviders providers={providers} title={title} />
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <TabsDetailInfo
          info={{
            cast,
            production_companies,
            production_countries,
            original_language,
            origin_country,
            spoken_languages,
            status,
            youtubeVideos,
            similar,
          }}
        />
      </div>
      {images?.length > 0 && <DetailImagesCarousel images={images} />}
    </div>
  );
};

export default MovieDetail;
