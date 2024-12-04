import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Popular } from "./views";
import { Nav } from "./components";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
      </Routes>
    </div>
  );
}

export default App;
