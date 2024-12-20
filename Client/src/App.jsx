import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Lists, Popular } from "./views";
import { Nav } from "./components";

function App() {
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
