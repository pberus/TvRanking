import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Lists, MovieDetail, Popular, TvSerieDetail } from "./views";
import { Nav } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLists } from "./redux/actions";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <ToastContainer position='bottom-center' theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/listas' element={<Lists />} />
        <Route path='/pelicula/:slug' element={<MovieDetail />} />
        <Route path='/serie/:slug' element={<TvSerieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
