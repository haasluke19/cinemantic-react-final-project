import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie";
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/:id' element={<Movie/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
