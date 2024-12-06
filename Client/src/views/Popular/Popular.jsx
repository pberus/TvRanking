import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/cards";
import { useEffect, useState } from "react";
import {
  getDiscoverFilms,
  getDiscoverSeries,
  removeTv,
} from "../../redux/actions";
import { YearRelease } from "../../components";

const Popular = () => {
  const [discover, setDiscover] = useState({
    filmsOrSeries: "films",
    sortBy: "popularity",
    yearRange: [],
  });

  const dispatch = useDispatch();

  const discoverFilms = useSelector((state) => state.discoverFilms);
  const discoverSeries = useSelector((state) => state.discoverSeries);

  useEffect(() => {
    if (discover.filmsOrSeries === "films") {
      dispatch(getDiscoverFilms(discover.sortBy, discover.yearRange));
      dispatch(removeTv("discoverSeries"));
    } else {
      dispatch(getDiscoverSeries(discover.sortBy, discover.yearRange));
      dispatch(removeTv("discoverFilms"));
    }
  }, [dispatch, discover]);

  const handleSort = (e) => {
    e.preventDefault();
    setDiscover({
      ...discover,
      sortBy: e.target.value,
    });
  };

  const handleYearChange = (newRange) => {
    setDiscover({
      ...discover,
      yearRange: newRange,
    });
  };

  return (
    <div>
      {/* BOTONES DE PELICULAS Y SERIES */}
      <button
        className={`btn ${
          discover.filmsOrSeries === "films" ? "btn-primary" : "btn-secondary"
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
          discover.filmsOrSeries === "series" ? "btn-primary" : "btn-secondary"
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
      {/* COLAPSO */}
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
        <div className='collapse' id='collapseExample'>
          <div className='card card-body'>
            {/* DROPDOWNS */}
            <div className='dropdown'>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                data-bs-auto-close='outside'
                aria-expanded='false'
              >
                Año de lanzamiento
              </button>
              <div className='dropdown-menu'>
                <p>Año de lanzamiento</p>
                <YearRelease onYearChange={handleYearChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <select
        name='sortBy'
        className='form-select'
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
      {discover.filmsOrSeries === "films" ? (
        <>{discoverFilms.length > 0 && <Cards tvArray={discoverFilms} />}</>
      ) : (
        <>{discoverSeries.length > 0 && <Cards tvArray={discoverSeries} />}</>
      )}
    </div>
  );
};

export default Popular;
