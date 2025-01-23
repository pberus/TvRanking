import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Error,
  Home,
  Lists,
  Login,
  MovieDetail,
  Popular,
  Ranking,
  Register,
  Search,
  TvSerieDetail,
} from "./views";
import { Nav, NotAuthenticateListsModal } from "./components";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const hideNavRoutes = ["/auth/login", "/auth/register"];

  const notAuthenticateListsModal = useSelector(
    (state) => state.notAuthenticateListsModal
  );

  const [loading, setLoading] = useState(true);

  useAuth(setLoading);

  //Para que no muestre ninguna ruta protegida mientras carga
  if (loading) {
    return <div className='content vh-100 text-white fs-3'>Loading...</div>;
  }

  return (
    <div>
      {!hideNavRoutes.includes(location.pathname) && <Nav />}
      <div className='content'>
        <ToastContainer position='bottom-center' theme='dark' />
        {notAuthenticateListsModal && <NotAuthenticateListsModal />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/listas' element={<Lists />} />
          <Route path='/pelicula/:slug' element={<MovieDetail />} />
          <Route path='/serie/:slug' element={<TvSerieDetail />} />
          <Route path='/buscar' element={<Search />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
