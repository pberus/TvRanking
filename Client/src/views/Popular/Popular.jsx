import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/cards";
import { useEffect, useState } from "react";
import {
  getDiscoverFilms,
  getDiscoverSeries,
  getGenres,
  getLenguages,
  removeTv,
} from "../../redux/actions";
import { YearRelease } from "../../components";
import style from "./popular.module.css";

const Popular = () => {
  const [discover, setDiscover] = useState({
    filmsOrSeries: "films",
    sortBy: "popularity",
    yearRange: [],
    lenguage: "",
    genres: [],
  });
  const [resetYear, setResetYear] = useState(false);
  const [activeLenguage, setActiveLenguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenres, setActiveGenres] = useState([]);

  const dispatch = useDispatch();

  const discoverFilms = useSelector((state) => state.discoverFilms);
  const discoverSeries = useSelector((state) => state.discoverSeries);

  let lenguages = useSelector((state) => state.lenguages);
  let { films, series } = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getLenguages());
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (discover.filmsOrSeries === "films") {
      dispatch(getDiscoverFilms(discover));
      dispatch(removeTv("discoverSeries"));
    } else {
      dispatch(getDiscoverSeries(discover));
      dispatch(removeTv("discoverFilms"));
    }
  }, [dispatch, discover]);

  //sort
  const handleSort = (e) => {
    e.preventDefault();
    setDiscover({
      ...discover,
      sortBy: e.target.value,
    });
  };

  //yearRelease
  const handleYearChange = (newRange) => {
    setDiscover({
      ...discover,
      yearRange: newRange,
    });
  };

  //lenguages
  const handleLenguage = (index) => {
    setActiveLenguage(index);
    setDiscover({ ...discover, lenguage: index });
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
        genres: filteredGenres,
      });
      setActiveGenres(filteredGenres);
    } else {
      setDiscover({
        ...discover,
        genres: [...activeGenres, index],
      });
      setActiveGenres([...activeGenres, index]);
    }
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
            onClick={() =>
              setDiscover({
                ...discover,
                filmsOrSeries: "films",
                sortBy: "popularity",
              })
            }
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
            onClick={() =>
              setDiscover({
                ...discover,
                filmsOrSeries: "series",
                sortBy: "popularity",
              })
            }
          >
            Series
          </button>
        </div>
        <div className={style.ordeFiltButtons}>
          {/* ORDENAMIENTOS */}
          <select
            name='sortBy'
            className='form-select w-auto'
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
                className='btn btn-primary'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseExample'
                aria-expanded='false'
                aria-controls='collapseExample'
              >
                Filtros
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* FILTERS COLLAPSE */}
      <div className='collapse mb-2' id='collapseExample'>
        <div className='card card-body'>
          {/* DROPDOWNS */}
          <div className='dropdown d-flex gap-3'>
            {/* year release */}
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Año de lanzamiento
            </button>
            <div className={`dropdown-menu ${style.yearRelease}`}>
              <div className={style.header}>
                <span className='dropdown-item-text'>Año de lanzamiento</span>
                <button onClick={() => setResetYear(true)}>X</button>
              </div>
              <hr className='dropdown-divider' />
              <YearRelease
                onYearChange={handleYearChange}
                reset={resetYear}
                setReset={setResetYear}
              />
            </div>
            {/* lenguages */}
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Idioma original
            </button>
            <ul className={`dropdown-menu ${style.lenguages}`}>
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
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              data-bs-auto-close='outside'
              aria-expanded='false'
            >
              Generos
            </button>
            <ul className={`dropdown-menu ${style.lenguages}`}>
              <li className={style.search}>
                <span className='dropdown-item-text w-auto'>Generos</span>
                <button onClick={handleResetLenguage}>X</button>
              </li>
              <hr className='dropdown-divider' />
              {discover.filmsOrSeries === "films"
                ? films?.map((gen) => (
                    <li key={gen.id}>
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
                  ))
                : series?.map((gen) => (
                    <li key={gen.id}>
                      <button
                        className={`dropdown-item ${
                          activeGenres.some((active) => active === gen.id)
                            ? "active"
                            : ""
                        }`}
                        aria-current={
                          activeGenres.some((active) => active === gen.id)
                            ? "active"
                            : "false"
                        }
                        onClick={() => handleGenres(gen.id)}
                      >
                        {gen.name}
                      </button>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      {/* CARDS */}
      {discover.filmsOrSeries === "films" ? (
        <>{discoverFilms.length > 0 && <Cards tvArray={discoverFilms} />}</>
      ) : (
        <>{discoverSeries.length > 0 && <Cards tvArray={discoverSeries} />}</>
      )}
    </div>
  );
};

export default Popular;
