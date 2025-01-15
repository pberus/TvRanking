import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchTv } from "../../redux/actions";
import { Card } from "../../components";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

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
  console.log("searchResults", searchResults);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <h4 className='ms-3'>Cargando resultados...</h4>; // Muestra un mensaje de carga
  }

  return (
    <div>
      <h2>Resultados de búsqueda de: {searchTerm}</h2>
      {searchResults?.length > 0 && (
        <div>
          {searchResults.map((tv) => (
            <div key={tv.id}>
              <Card tv={tv} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
