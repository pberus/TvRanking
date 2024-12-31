import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Lists, Popular } from "./views";
import { Nav } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLists } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/listas' element={<Lists />} />
      </Routes>
    </div>
  );
}

export default App;
