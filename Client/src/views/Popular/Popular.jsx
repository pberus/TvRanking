import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/cards";
import { useEffect, useState } from "react";
import {
  getDiscoverFilms,
  getDiscoverSeries,
} from "../../redux/actions";

const Popular = () => {
  const [discover, setDiscover] = useState({
    filmsOrSeries: "films",
    order: "popularity",
  });
  const dispatch = useDispatch();

  const discoverFilms = useSelector((state) => state.discoverFilms);
  const discoverSeries = useSelector((state) => state.discoverSeries);

  useEffect(() => {
    if (discover.filmsOrSeries === "films") {
      dispatch(getDiscoverFilms());
    } else {
      dispatch(getDiscoverSeries());
    }
  }, [dispatch, discover]);

  return (
    <div>
      <button
        className={`btn ${discover.filmsOrSeries === "films" ? "btn-primary" : "btn-secondary"}`}
        disabled={discover.filmsOrSeries === "films"}
        onClick={() => setDiscover({
            ...discover,
            filmsOrSeries: "films"
        })}
      >
        Peliculas
      </button>
      <button
        className={`btn ${discover.filmsOrSeries === "series" ? "btn-primary" : "btn-secondary"}`}
        disabled={discover.filmsOrSeries === "series"}
        onClick={() => setDiscover({
            ...discover,
            filmsOrSeries: "series"
        })}
      >
        Series
      </button>
      <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenu2'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          Filtros
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
          <button className='dropdown-item' type='button'>
            Action
          </button>
          <button className='dropdown-item' type='button'>
            Another action
          </button>
          <button className='dropdown-item' type='button'>
            Something else here
          </button>
        </div>
      </div>
      <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenu2'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          Ordenamientos
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
          <button className='dropdown-item' type='button'>
            Popularidad
          </button>
          <button className='dropdown-item' type='button'>
            Alfabético
          </button>
          <button className='dropdown-item' type='button'>
            Año de lanzamiento
          </button>
          <button className='dropdown-item' type='button'>
            Recaudación
          </button>
          <button className='dropdown-item' type='button'>
            Calificación de TMDB 
          </button>
        </div>
      </div>
      {discover.filmsOrSeries === "films" ? (
        <>
          {discoverFilms.length > 0 && (
            <Cards tvArray={discoverFilms} />
          )}
        </>
      ) : (
        <>
          {discoverSeries.length > 0 && (
            <Cards tvArray={discoverSeries} />
          )}
        </>
      )}
    </div>
  );
};

export default Popular;
