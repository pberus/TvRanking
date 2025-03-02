import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllLists,
  getDiscoverFilms,
  getDiscoverSeries,
  getGenres,
  getLenguages,
  getProviders,
  removeTv,
} from "../../redux/actions";
import {
  InfiniteScrollPopular,
  Rating,
  Runtime,
  Streaming,
  YearRelease,
} from "../../components";
import style from "./popular.module.css";
import { SmartDisplay, HighlightOff, FilterAlt } from "@mui/icons-material";
import { BounceLoader } from "react-spinners";

const Popular = () => {
  const [loading, setLoading] = useState(false);

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

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    setLoading(true);
    isAuthenticated.authenticated && dispatch(getAllLists());
    setLoading(false);
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Activa el spinner
      await Promise.all([
        dispatch(getLenguages()),
        dispatch(getGenres()),
        dispatch(getProviders()),
      ]);
      setLoading(false); // Desactiva el spinner
    };

    fetchData();
  }, [dispatch]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const fetchDiscover = () => {
      setLoading(true);
      if (discover.filmsOrSeries === "films") {
        dispatch(getDiscoverFilms(discover));
        dispatch(removeTv("discoverSeries"));
      } else {
        dispatch(getDiscoverSeries(discover));
        dispatch(removeTv("discoverFilms"));
      }
      setLoading(false);
    };

    fetchDiscover();
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
      {loading ? (
        <div style={{ backgroundColor: "black", height: "100vh" }}>
          <BounceLoader color='#ffffff' size={50} />
          <p className='text-white'>Cargando...</p>
        </div>
      ) : (
        <>
          <div className={style.nav}>
            <div className={style.filmsSeriesButtons}>
              {/* BOTONES DE PELICULAS Y SERIES */}
              <div>
                <button
                  className='btn btn-dark border rounded-0 rounded-start'
                  disabled={discover.filmsOrSeries === "films"}
                  onClick={() => handleResetAll("films")}
                >
                  Peliculas
                </button>
                <button
                  className='btn btn btn-dark border rounded-0 rounded-end'
                  disabled={discover.filmsOrSeries === "series"}
                  onClick={() => handleResetAll("series")}
                >
                  Series
                </button>
              </div>
              <div>
                {(discoverFilms.totalResults || discoverSeries.totalResults) &&
                  !isMobile && (
                    <p className='text-white'>
                      {discover.filmsOrSeries === "films"
                        ? discoverFilms.totalResults?.toLocaleString("es-ES")
                        : discoverSeries.totalResults?.toLocaleString(
                            "es-ES"
                          )}{" "}
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
                    className='btn btn-dark border'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseExample1'
                    aria-expanded='false'
                    aria-controls='collapseExample'
                  >
                    <SmartDisplay />
                    {filmsProviders?.length > 0 && !isMobile && (
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
                className='form-select w-25 btn btn-dark text-start border'
                aria-label='Default select example'
                value={discover.sortBy}
                onChange={handleSort}
              >
                <option value='' disabled>
                  {isMobile ? "⇅" : "Ordenamientos"}
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
                    className={`btn btn-dark border ${
                      activeFilters > 0 && "text-warning"
                    }`}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseExample'
                    aria-expanded='false'
                    aria-controls='collapseExample'
                  >
                    {isMobile ? <FilterAlt /> : "Filtros"}
                    {activeFilters > 0 && (
                      <span className={style.activeFilters}>
                        {activeFilters}
                      </span>
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
            <div className='card card-body bg-dark'>
              {/* DROPDOWNS */}
              <div className='dropdown d-flex gap-3 d-flex align-items-baseline flex-wrap'>
                {/* year release */}
                <button
                  className={`btn btn-dark border dropdown-toggle ${
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
                    <span className='dropdown-item-text'>
                      Año de lanzamiento
                    </span>
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
                  className={`btn btn-dark border dropdown-toggle ${
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
                  className={`btn btn-dark border dropdown-toggle ${
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
                                  activeGenres.some(
                                    (active) => active === gen.id
                                  )
                                    ? "active"
                                    : ""
                                }`}
                                aria-current={
                                  activeGenres.some(
                                    (active) => active === gen.id
                                  )
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
                                  activeGenres.some(
                                    (active) => active === gen.id
                                  )
                                    ? "active"
                                    : ""
                                }`}
                                aria-current={
                                  activeGenres.some(
                                    (active) => active === gen.id
                                  )
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
                  className={`btn btn-dark border dropdown-toggle ${
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
                  className={`btn btn-dark border dropdown-toggle ${
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
                    <span className='dropdown-item-text'>
                      Calificación de TMDB
                    </span>
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
                  className='bg-dark border-0'
                  onClick={handleResetFilters}
                >
                  <p className='text-secondary m-0'>
                    <HighlightOff /> REINICIAR
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* INFINITE SCROLL */}
          {discover.filmsOrSeries === "films" ? (
            <>
              {uniqueFilms?.length > 0 && (
                <InfiniteScrollPopular
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
                <InfiniteScrollPopular
                  items={uniqueSeries}
                  totalPages={discoverSeries.totalPages}
                  setDiscover={setDiscover}
                  discover={discover}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Popular;
