import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import Header from "./Components/Nav/Header";
import AddMovie from "./Components/AddMovie/AddMovie";
import MyMovies from "./Components/MyMovies/MyMovies";
import Movie from "./Components/Movie/Movie";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/myMovies" element={<MyMovies />} />
        <Route path="/Movie" element={<Movie />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
