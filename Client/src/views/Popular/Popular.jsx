import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/cards";
import { useEffect, useState } from "react";
import { getDiscoverFilms, getDiscoverSeries } from "../../redux/actions";

const Popular = () => {
  const [discover, setDiscover] = useState({
    filmsOrSeries: "films",
    sortBy: "popularity",
  });
  const dispatch = useDispatch();

  const discoverFilms = useSelector((state) => state.discoverFilms);
  const discoverSeries = useSelector((state) => state.discoverSeries);

  useEffect(() => {
    if (discover.filmsOrSeries === "films") {
      dispatch(getDiscoverFilms(discover.sortBy));
    } else {
      dispatch(getDiscoverSeries(discover.sortBy));
    }
  }, [dispatch, discover]);

  const handleSort = (e) => {
    e.preventDefault();
    setDiscover({
      ...discover,
      sortBy: e.target.value,
    });
  };

  return (
    <div>
      <button
        className={`btn ${
          discover.filmsOrSeries === "films" ? "btn-primary" : "btn-secondary"
        }`}
        disabled={discover.filmsOrSeries === "films"}
        onClick={() =>
          setDiscover({
            ...discover,
            filmsOrSeries: "films",
            sortBy: "popularity"
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
            sortBy: "popularity"
          })
        }
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
