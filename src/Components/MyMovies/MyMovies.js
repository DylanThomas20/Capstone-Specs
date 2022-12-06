import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import MovieItem from "../../Elements/MovieItem";

const MyMovies = () => {
  const authCtx = useContext(AuthContext);
  const [myMovies, setMyMovies] = useState([]);

  const getAllMyMovies = () => {
    axios
      .get(`/myMovies/${authCtx.userId}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMyMovies(res.data);
      });
  };

  useEffect(getAllMyMovies, []);

  return (
    <div>
      {myMovies.map((movie) => {
        return <MovieItem movie={movie.movie} myMovies={true} />;
      })}
    </div>
  );
};

export default MyMovies;
