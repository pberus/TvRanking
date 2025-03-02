import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists, searchTv } from "../../redux/actions";
import { Card } from "../../components";
import tmdbIcono from "../../assets/tmdb-logo.svg";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated.authenticated && dispatch(getAllLists());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setLoading(true); // Reinicia el estado de carga al cambiar el slug
    const params = new URLSearchParams(location.search);
    const term = params.get("query");
    setSearchTerm(term);
    dispatch(searchTv(term)).then(() => {
      setLoading(false); // Cambia el estado a false cuando los datos estén listos
    });
  }, [location.search, dispatch]);

  const searchResults = useSelector((state) => state.searchResults);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <h4 className='p-3 text-white'>Cargando resultados...</h4>; // Muestra un mensaje de carga
  }

  return (
    <div className='p-3'>
      <div className='p-2 border-bottom'>
        <h2 className='text-white'>
          Resultados de búsqueda de:{" "}
          <span className='text-primary'>{searchTerm}</span>
        </h2>
        {searchTerm ? (
          <h5 className='text-light'>
            Se encontraron {searchResults?.length} resultados
          </h5>
        ) : (
          <h5 className='text-light'>Tendencias de hoy</h5>
        )}
      </div>
      {searchResults?.length > 0 && (
        <div className='m-3'>
          {searchResults.map((tv) => (
            <div
              key={tv.id}
              className='mb-3 pb-3 border-bottom d-flex flex-column flex-sm-row align-items-center align-items-sm-start'
            >
              <div>
                <Card
                  tv={{
                    id: tv.id,
                    title: tv.media_type === "movie" ? tv.title : tv.name,
                    image: tv.poster_path,
                    media_type: tv.media_type,
                    date:
                      tv.media_type === "movie"
                        ? tv.release_date
                        : tv.first_air_date,
                  }}
                />
              </div>
              <div className='ms-3 mt-3'>
                <h4>
                  <span className='text-white'>
                    {tv.media_type === "movie" ? tv.title : tv.name}{" "}
                  </span>
                  {(tv.release_date || tv.first_air_date) && (
                    <span style={{ color: "grey", fontSize: "0.8em" }}>
                      (
                      {new Date(
                        tv.media_type === "movie"
                          ? tv.release_date
                          : tv.first_air_date
                      ).getFullYear()}
                      )
                    </span>
                  )}
                  <span
                    style={{
                      color: "#3f5ebe",
                      fontSize: "0.6em",
                      marginLeft: "10px",
                      backgroundColor: "#dbeafe",
                      borderRadius: "10px",
                      padding: "2px 7px",
                    }}
                  >
                    {tv.media_type === "movie" ? "Película" : "Serie"}
                  </span>
                </h4>
                <h4 className='text-secondary fs-5'>
                  Titulo original:{" "}
                  {tv.media_type === "movie"
                    ? tv.original_title
                    : tv.original_name}
                </h4>
                <p className='text-light mt-3'>{tv.overview}</p>
                {tv.vote_average > 0 && (
                  <div className='text-light'>
                    <img
                      src={tmdbIcono}
                      alt='tmdb-logo'
                      width='60'
                      className='me-2'
                    />
                    {tv.vote_average.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
