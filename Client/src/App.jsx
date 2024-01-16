import './App.css'
import Home from './views';
import { Route, Routes } from "react-router-dom";

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
