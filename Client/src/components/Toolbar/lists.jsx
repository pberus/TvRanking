import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getFilteredList,
  getGenres,
  getLenguages,
  getProviders,
} from "../../redux/actions";
import { Rating, Runtime, Streaming, YearRelease } from "../../components";
import imgStreaming from "../../assets/video-en-directo.png";
import iconoCerrar from "../../assets/cerrar-simbolo-de-boton-circular.png";
import style from "./lists.module.css";

const ToolbarLists = ({ list, totalResults }) => {
  const [filtersList, setFiltersList] = useState({
    filmsOrSeries: "movie",
    sortBy: "",
    yearRange: [],
    lenguage: "",
    genres: [],
    runtime: [],
    rating: [],
    providers: [],
    list,
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
    for (const prop in filtersList) {
      if (
        prop === "yearRange" ||
        prop === "genres" ||
        prop === "runtime" ||
        prop === "rating"
      ) {
        filtersList[prop].length > 0 && count++;
      } else if (prop === "lenguage") {
        filtersList[prop] && count++;
      }
    }
    setActiveFilters(count);
    dispatch(getFilteredList(filtersList));
  }, [dispatch, filtersList]);

  useEffect(() => {
    setFiltersList((prevValues) => ({
      ...prevValues,
      list,
    }));
  }, [list]);

  //sort
  const handleSort = (e) => {
    e.preventDefault();
    setFiltersList({
      ...filtersList,
      sortBy: e.target.value,
    });
  };

  //lenguages
  const handleLenguage = (index) => {
    if (index === activeLenguage) {
      setActiveLenguage("");
      setFiltersList({ ...filtersList, lenguage: "" });
    } else {
      setActiveLenguage(index);
      setFiltersList({ ...filtersList, lenguage: index });
    }
  };

  const filteredLenguages = lenguages?.filter((len) =>
    len.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeInputLenguage = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResetLenguage = () => {
    setFiltersList({
      ...filtersList,
      lenguage: "",
    });
    setActiveLenguage("");
    setSearchTerm("");
  };

  //genres
  const handleGenres = (index) => {
    if (activeGenres.includes(index)) {
      let filteredGenres = activeGenres.filter((gen) => gen !== index);
      setFiltersList({
        ...filtersList,
        genres: filteredGenres,
      });
      setActiveGenres(filteredGenres);
    } else {
      setFiltersList({
        ...filtersList,
        genres: [...activeGenres, index],
      });
      setActiveGenres([...activeGenres, index]);
    }
  };

  const handleResetGenres = () => {
    setFiltersList({
      ...filtersList,
      genres: [],
    });
    setActiveGenres([]);
  };

  //all filters

  const handleResetFilters = () => {
    setFiltersList({
      ...filtersList,
      yearRange: [],
      lenguage: "",
      genres: [],
      runtime: [],
      rating: [],
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
    setFiltersList({
      ...filtersList,
      [property]: newRange,
    });
  };

  const handleResetAll = (mediaType) => {
    setFiltersList({
      ...filtersList,
      filmsOrSeries: mediaType,
      sortBy: "",
      yearRange: [],
      lenguage: "",
      genres: [],
      runtime: [],
      rating: [],
      providers: [],
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
          <div>
            <button
              className='btn btn-dark border rounded-0 rounded-start'
              disabled={filtersList.filmsOrSeries === "movie"}
              onClick={() => handleResetAll("movie")}
            >
              Peliculas
            </button>
            <button
              className='btn btn btn-dark border rounded-0 rounded-end'
              disabled={filtersList.filmsOrSeries === "tv"}
              onClick={() => handleResetAll("tv")}
            >
              Series
            </button>
          </div>
          <div>
            {totalResults > 0 && (
              <p className='text-secondary'>
                {totalResults?.toLocaleString("es-ES")} titulos
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
                      filtersList.providers.length > 0 && "text-warning"
                    }`}
                  >
                    {filtersList.filmsOrSeries === "movie"
                      ? filtersList.providers.length > 0
                        ? `${filtersList.providers.length}/${filmsProviders.length}`
                        : filmsProviders?.length
                      : filtersList.providers.length > 0
                      ? `${filtersList.providers.length}/${seriesProviders.length}`
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
            value={filtersList.sortBy}
            onChange={handleSort}
          >
            <option value='' disabled>
              Ordenamientos
            </option>
            <option value='last_added'>Ultimo agregado</option>
            <option value='popularity'>Popularidad</option>
            <option value='date'>Fecha de lanzamiento</option>
            <option value='title'>Alfabético</option>
            <option value='vote_average'>Calificación de TMDB</option>
            {filtersList.filmsOrSeries === "movie" ? (
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
                filtersList.filmsOrSeries === "movie"
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
                filtersList.yearRange.length > 0 && "text-warning"
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
                filtersList.lenguage && "text-warning"
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
                filtersList.genres.length > 0 && "text-warning"
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
                {filtersList.filmsOrSeries === "movie"
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
                filtersList.runtime.length > 0 && "text-warning"
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
                  {filtersList.filmsOrSeries === "movie"
                    ? "Duración total"
                    : "Duración promedio de los episodios"}
                </span>
                <button onClick={() => setResetRuntime(true)}>X</button>
              </div>
              <hr className='dropdown-divider' />
              <Runtime
                filmsOrSeries={filtersList.filmsOrSeries}
                onRuntimeChange={handleChange}
                reset={resetRuntime}
                setReset={setResetRuntime}
              />
            </div>
            {/* rating */}
            <button
              className={`btn btn-secondary dropdown-toggle ${
                filtersList.rating.length > 0 && "text-warning"
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
    </div>
  );
};

ToolbarLists.propTypes = {
  list: PropTypes.string.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default ToolbarLists;
