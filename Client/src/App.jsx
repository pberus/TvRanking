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
import { Nav } from "./components";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/register"];

  return (
    <div>
      {!hideNavRoutes.includes(location.pathname) && <Nav />}
      <ToastContainer position='bottom-center' theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/listas' element={<Lists />} />
        <Route path='/pelicula/:slug' element={<MovieDetail />} />
        <Route path='/serie/:slug' element={<TvSerieDetail />} />
        <Route path='/buscar' element={<Search />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
