import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDiscoverFilms,
  getDiscoverSeries,
  getGenres,
  getLenguages,
  getProviders,
  removeTv,
} from "../../redux/actions";
import {
  InfiniteScrollCards,
  Rating,
  Runtime,
  Streaming,
  YearRelease,
} from "../../components";
import style from "./popular.module.css";
import imgStreaming from "../../assets/video-en-directo.png";
import iconoCerrar from "../../assets/cerrar-simbolo-de-boton-circular.png";

const Popular = () => {
  const [discover, setDiscover] = useState({
    filmsOrSeries: "films",
    sortBy: "",
    yearRange: [],
    lenguage: "",
    genres: [],
    runtime: [],
    rating: [],
    providers: [],
    page: "",
  });
  const [resetYear, setResetYear] = useState(false);
  const [activeLenguage, setActiveLenguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenres, setActiveGenres] = useState([]);
  const [resetRuntime, setResetRuntime] = useState(false);
  const [resetRating, setResetRating] = useState(false);
  const [resetProviders, setResetProviders] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const dispatch = useDispatch();

  const discoverFilms = useSelector((state) => state.discoverFilms);
  const discoverSeries = useSelector((state) => state.discoverSeries);

  const lenguages = useSelector((state) => state.lenguages);
  const { filmsGenres, seriesGenres } = useSelector((state) => state.genres);
  const { filmsProviders, seriesProviders } = useSelector(
    (state) => state.providers
  );

  useEffect(() => {
    dispatch(getLenguages());
    dispatch(getGenres());
    dispatch(getProviders());
  }, [dispatch]);

  useEffect(() => {
    //active filters
    let count = 0;
    for (const prop in discover) {
      if (
        prop === "yearRange" ||
        prop === "genres" ||
        prop === "runtime" ||
        prop === "rating"
      ) {
        discover[prop].length > 0 && count++;
      } else if (prop === "lenguage") {
        discover[prop] && count++;
      }
    }
    setActiveFilters(count);
    // films/series
    if (discover.filmsOrSeries === "films") {
      dispatch(getDiscoverFilms(discover));
      dispatch(removeTv("discoverSeries"));
    } else {
      dispatch(getDiscoverSeries(discover));
      dispatch(removeTv("discoverFilms"));
    }
  }, [dispatch, discover]);

  //remove duplicates
  let uniqueFilms =
    discoverFilms.results &&
    Array.from(
      discoverFilms.results
        ?.reduce((map, obj) => {
          if (!map.has(obj.id)) {
            map.set(obj.id, obj);
          }
          return map;
        }, new Map())
        .values()
    );

  let uniqueSeries =
    discoverSeries.results &&
    Array.from(
      discoverSeries.results
        ?.reduce((map, obj) => {
          // Si el id no está en el Map, lo agregamos
          if (!map.has(obj.id)) {
            map.set(obj.id, obj);
          }
          return map;
        }, new Map())
        .values()
    );

  //sort
  const handleSort = (e) => {
    e.preventDefault();
    setDiscover({
      ...discover,
      page: "",
      sortBy: e.target.value,
    });
  };

  //lenguages
  const handleLenguage = (index) => {
    if (index === activeLenguage) {
      setActiveLenguage("");
      setDiscover({ ...discover, page: "", lenguage: "" });
    } else {
      setActiveLenguage(index);
      setDiscover({ ...discover, page: "", lenguage: index });
    }
  };

  const filteredLenguages = lenguages?.filter((len) =>
    len.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeInputLenguage = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResetLenguage = () => {
    setDiscover({
      ...discover,
      page: "",
      lenguage: "",
    });
    setActiveLenguage("");
    setSearchTerm("");
  };

  //genres
  const handleGenres = (index) => {
    if (activeGenres.includes(index)) {
      let filteredGenres = activeGenres.filter((gen) => gen !== index);
      setDiscover({
        ...discover,
        page: "",
        genres: filteredGenres,
      });
      setActiveGenres(filteredGenres);
    } else {
      setDiscover({
        ...discover,
        page: "",
        genres: [...activeGenres, index],
      });
      setActiveGenres([...activeGenres, index]);
    }
  };

  const handleResetGenres = () => {
    setDiscover({
      ...discover,
      page: "",
      genres: [],
    });
    setActiveGenres([]);
  };

  //all filters

  const handleResetFilters = () => {
    setDiscover({
      ...discover,
      yearRange: [],
      lenguage: "",
      genres: [],
      runtime: [],
      rating: [],
      page: "",
    });
    setResetYear(true);
    setActiveLenguage("");
    setSearchTerm("");
    setActiveGenres([]);
    setResetRuntime(true);
    setResetRating(true);
  };

  //all options
  const handleChange = (property, newRange) => {
    setDiscover({
      ...discover,
      page: "",
      [property]: newRange,
    });
  };

  const handleResetAll = (mediaType) => {
    setDiscover({
      ...discover,
      filmsOrSeries: mediaType,
      sortBy: "",
      yearRange: [],
      lenguage: "",
      genres: [],
      runtime: [],
      rating: [],
      providers: [],
      page: "",
    });
    setResetYear(true);
    setActiveLenguage("");
    setSearchTerm("");
    setActiveGenres([]);
    setResetRuntime(true);
    setResetRating(true);
    setResetProviders(true);
  };

  return (
    <div className={style.popular}>
      <div className={style.nav}>
        <div className={style.filmsSeriesButtons}>
          {/* BOTONES DE PELICULAS Y SERIES */}
          <button
            className={`btn ${
              discover.filmsOrSeries === "films"
                ? "btn-primary"
                : "btn-secondary"
            }`}
            disabled={discover.filmsOrSeries === "films"}
            onClick={() => handleResetAll("films")}
          >
            Peliculas
          </button>
          <button
            className={`btn ${
              discover.filmsOrSeries === "series"
                ? "btn-primary"
                : "btn-secondary"
            }`}
            disabled={discover.filmsOrSeries === "series"}
            onClick={() => handleResetAll("series")}
          >
            Series
          </button>
          <div>
            {(discoverFilms.totalResults || discoverSeries.totalResults) && (
              <p className='text-secondary'>
                {discover.filmsOrSeries === "films"
                  ? discoverFilms.totalResults?.toLocaleString("es-ES")
                  : discoverSeries.totalResults?.toLocaleString("es-ES")}{" "}
                titulos
              </p>
            )}
          </div>
        </div>
        <div className={style.ordeFiltButtons}>
          {/* STREAMING */}
          <div>
            <p className='d-inline-flex gap-1'>
              <button
                className='btn btn-light border-secondary-subtle'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseExample1'
                aria-expanded='false'
                aria-controls='collapseExample'
              >
                <img
                  className={style.imgStreaming}
                  src={imgStreaming}
                  alt='streaming'
                />
                {filmsProviders?.length > 0 && (
                  <span
                    className={`${style.spanStreaming} ${
                      discover.providers.length > 0 && "text-warning"
                    }`}
                  >
                    {discover.filmsOrSeries === "films"
                      ? discover.providers.length > 0
                        ? `${discover.providers.length}/${filmsProviders.length}`
                        : filmsProviders?.length
                      : discover.providers.length > 0
                      ? `${discover.providers.length}/${seriesProviders.length}`
                      : seriesProviders?.length}
                  </span>
                )}
              </button>
            </p>
          </div>
          {/* ORDENAMIENTOS */}
          <select
            name='sortBy'
            className='form-select w-auto border-secondary-subtle'
            aria-label='Default select example'
            value={discover.sortBy}
            onChange={handleSort}
          >
            <option value='' disabled>
              Ordenamientos
            </option>
            <option value='popularity'>Popularidad</option>
            <option value='trending'>Tendencia</option>
            <option
              value={
                discover.filmsOrSeries === "films"
                  ? "primary_release_date"
                  : "first_air_date"
              }
            >
              Fecha de lanzamiento
            </option>
            <option
              value={
                discover.filmsOrSeries === "films"
                  ? "original_title"
                  : "original_name"
              }
            >
              Alfabético
            </option>
            <option value='vote_average'>Calificación de TMDB</option>
            {discover.filmsOrSeries === "films" ? (
              <option value='revenue'>Recaudación</option>
            ) : (
              <option value='vote_count'>Cantidad de votos</option>
            )}
          </select>
          {/* FILTROS */}
          <div>
            <p className='d-inline-flex gap-1'>
              <button
                className={`btn btn-secondary ${
                  activeFilters > 0 && "text-warning"
                }`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseExample'
                aria-expanded='false'
                aria-controls='collapseExample'
              >
                Filtros
                {activeFilters > 0 && (
                  <span className={style.activeFilters}>{activeFilters}</span>
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* STREAMING COLLAPSE */}
      <div className='collapse mb-2' id='collapseExample1'>
        <div className='card card-body bg-dark'>
          {filmsProviders?.length > 0 && (
            <Streaming
              streamingArray={
                discover.filmsOrSeries === "films"
                  ? filmsProviders
                  : seriesProviders
              }
              onStreamingChange={handleChange}
              reset={resetProviders}
              setReset={setResetProviders}
            />
          )}
        </div>
      </div>
      {/* FILTERS COLLAPSE */}
      <div className='collapse mb-2' id='collapseExample'>
        <div className='card card-body'>
          {/* DROPDOWNS */}
          <div className='dropdown d-flex gap-3 d-flex align-items-baseline'>
            {/* year release */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                discover.yearRange.length > 0 && "text-warning"
              }`}
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Año de lanzamiento
            </button>
            <div className='dropdown-menu'>
              <div className={style.header}>
                <span className='dropdown-item-text'>Año de lanzamiento</span>
                <button onClick={() => setResetYear(true)}>X</button>
              </div>
              <hr className='dropdown-divider' />
              <YearRelease
                onYearChange={handleChange}
                reset={resetYear}
                setReset={setResetYear}
              />
            </div>
            {/* lenguages */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                discover.lenguage && "text-warning"
              }`}
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Idioma original
            </button>
            <ul className={`dropdown-menu ${style.dropdownList}`}>
              <li className={style.search}>
                <span className='dropdown-item-text w-auto'>
                  Idioma original
                </span>
                <input
                  className='form-control w-auto'
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={handleChangeInputLenguage}
                  value={searchTerm}
                />
                <button onClick={handleResetLenguage}>X</button>
              </li>
              <hr className='dropdown-divider' />
              {filteredLenguages.length > 0 ? (
                filteredLenguages.map((len) => (
                  <li key={len.iso}>
                    <button
                      className={`dropdown-item ${
                        activeLenguage === len.iso && "active"
                      }`}
                      aria-current={
                        activeLenguage === len.iso ? "true" : "false"
                      }
                      onClick={() => handleLenguage(len.iso)}
                    >
                      {len.name}
                    </button>
                  </li>
                ))
              ) : (
                <li>No hay resultados</li>
              )}
            </ul>
            {/* genres */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                discover.genres.length > 0 && "text-warning"
              }`}
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Generos
            </button>
            <ul className={`dropdown-menu ${style.dropdownList}`}>
              <li className={style.search}>
                <span className='dropdown-item-text w-auto'>Generos</span>
                <button onClick={handleResetGenres}>X</button>
              </li>
              <hr className='dropdown-divider' />
              <div className='row'>
                {discover.filmsOrSeries === "films"
                  ? filmsGenres?.map((gen) => (
                      <div className='col-6' key={gen.id}>
                        <li>
                          <button
                            className={`dropdown-item
                              ${
                                activeGenres.some((active) => active === gen.id)
                                  ? "active"
                                  : ""
                              }`}
                            aria-current={
                              activeGenres.some((active) => active === gen.id)
                                ? "true"
                                : "false"
                            }
                            onClick={() => handleGenres(gen.id)}
                          >
                            {gen.name}
                          </button>
                        </li>
                      </div>
                    ))
                  : seriesGenres?.map((gen) => (
                      <div className='col-6' key={gen.id}>
                        <li>
                          <button
                            className={`dropdown-item ${
                              activeGenres.some((active) => active === gen.id)
                                ? "active"
                                : ""
                            }`}
                            aria-current={
                              activeGenres.some((active) => active === gen.id)
                                ? "true"
                                : "false"
                            }
                            onClick={() => handleGenres(gen.id)}
                          >
                            {gen.name}
                          </button>
                        </li>
                      </div>
                    ))}
              </div>
            </ul>
            {/* runtime */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                discover.runtime.length > 0 && "text-warning"
              }`}
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Duración
            </button>
            <div className='dropdown-menu'>
              <div className={style.header}>
                <span className='dropdown-item-text'>
                  {discover.filmsOrSeries === "films"
                    ? "Duración total"
                    : "Duración promedio de los episodios"}
                </span>
                <button onClick={() => setResetRuntime(true)}>X</button>
              </div>
              <hr className='dropdown-divider' />
              <Runtime
                filmsOrSeries={discover.filmsOrSeries}
                onRuntimeChange={handleChange}
                reset={resetRuntime}
                setReset={setResetRuntime}
              />
            </div>
            {/* rating */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                discover.rating.length > 0 && "text-warning"
              }`}
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Calificación
            </button>
            <div className='dropdown-menu'>
              <div className={style.header}>
                <span className='dropdown-item-text'>Calificación de TMDB</span>
                <button onClick={() => setResetRating(true)}>X</button>
              </div>
              <hr className='dropdown-divider' />
              <Rating
                onRatingChange={handleChange}
                reset={resetRating}
                setReset={setResetRating}
              />
            </div>
            <button
              className='border-0 bg-white d-inline'
              onClick={handleResetFilters}
            >
              <p className='text-secondary m-0'>
                <img className={style.imgStreaming} src={iconoCerrar} />{" "}
                REINICIAR
              </p>
            </button>
          </div>
        </div>
      </div>
      {/* INFINITE SCROLL */}
      {discover.filmsOrSeries === "films" ? (
        <>
          {uniqueFilms?.length > 0 && (
            <InfiniteScrollCards
              items={uniqueFilms}
              totalPages={discoverFilms.totalPages}
              setDiscover={setDiscover}
              discover={discover}
            />
          )}
        </>
      ) : (
        <>
          {uniqueSeries?.length > 0 && (
            <InfiniteScrollCards
              items={uniqueSeries}
              totalPages={discoverSeries.totalPages}
              setDiscover={setDiscover}
              discover={discover}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Popular;
