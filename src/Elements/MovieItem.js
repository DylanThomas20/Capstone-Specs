import { useState, useContext } from "react";
import "./MovieItem.css";
import axios from "axios";
import AuthContext from "../store/authContext";

const MovieItem = ({ movie, getAllMovies, myMovies }) => {
  const authCtx = useContext(AuthContext);

  const [editing, setEditing] = useState(false);

  const [movieTitle, setMovieTitle] = useState(movie.movieTitle);
  const [moviePoster, setMoviePoster] = useState(movie.moviePoster);

  const updateMovie = (e) => {
    e.preventDefault();
    console.log("hitUpdateMovie");

    const body = { movieTitle, moviePoster, movieId: movie.id };

    axios
      .put("/movie", body, {
        headers: {
          authorization: authCtx.token,
        },
      })

      .then((res) => {
        setEditing(false);
        getAllMovies();
      })
      .catch((err) => console.log(err));
  };
  const saveToMyMovies = () => {
    axios
      .post(
        "/myMovies",
        { userId: authCtx.userId, movieId: movie.id },
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const removeFromMyMovies = () => {
    axios
      .delete(
        "/myMovies",
        { userId: authCtx.userId, movieId: movie.id },
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  console.log(movie);
  return (
    <div className="movieCard">
      {!editing ? (
        <div>
          <p>USER: {movie.user.username}</p>
          <p>Movie Title: {movie.movieTitle}</p>
          <p>Movie Poster: {movie.moviePoster}</p>
          {myMovies ? (
            <button>Remove</button>
          ) : (
            <button onClick={() => saveToMyMovies()}>Save Movie</button>
          )}
        </div>
      ) : (
        <form onSubmit={(e) => updateMovie(e)}>
          <input
            placeholder="Movie Title"
            type="text"
            onChange={(e) => setMovieTitle(e.target.value)}
            value={movieTitle}
          />
          <input
            placeholder="Movie Poster"
            type="text"
            onChange={(e) => setMoviePoster(e.target.value)}
            value={moviePoster}
          />
          <button>Submit</button>
        </form>
      )}
      {myMovies ? null : (
        <button onClick={() => setEditing(!editing)}>
          {editing ? "Cancel Changes" : "Edit Movie"}
        </button>
      )}
    </div>
  );
};

export default MovieItem;
