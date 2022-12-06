import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MovieItem from "../../Elements/MovieItem";
import AuthContext from "../../store/authContext";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [movie, setMovies] = useState([]);

  const getAllMovies = () => {
    console.log("hit getAllMovies");
    axios
      .get("/movie", {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(getAllMovies, []);

  return (
    <div>
      {movie.map((movie) => {
        return (
          <MovieItem key={movie.id} movie={movie} getAllMovies={getAllMovies} />
        );
      })}
    </div>
  );
};

export default Home;
