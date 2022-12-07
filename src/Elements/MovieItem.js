import { useState, useContext } from "react";
import "./MovieItem.css";
import axios from "axios";
import AuthContext from "../store/authContext";

const MovieItem = ({ movie, getAllMovies, myMovies }) => {
  const authCtx = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

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
  const deleteMovie = () => {
    // console.log("deleteMovie hit");
    axios
      .delete(`/myMovies/${movie.id}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log("savedMovieDeletedBud");
      })
      .catch((err) => console.log(err));
    axios
      .delete(`/movie/${movie.id}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
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
      .then(() => console.log(""))
      .catch((err) => console.log(err));
  };
  const savedMovieCheck = (movieId, movieUserId) => {
    axios.post();

    //write axios.post request that checks the saved movies array
    //for any post that is saved by a user, and have it check if
    //that this is the saved post.
  };
  // const deleteSavedMovie = () => {
  //   axios
  //     .delete(`/movie/${movie.id}`, {
  //       headers: {
  //         authorization: authCtx.token,
  //       },
  //     })
  //     .then((res) => {
  //       getAllMovies();
  //     })
  //     .catch((err) => console.log(err));
  // };

  savedMovieCheck(movie.id, movie.user.userId);
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
            <div>
              {!saved ? (
                <button onClick={() => saveToMyMovies()}>Save Movie</button>
              ) : (
                console.log("already saved")
              )}
            </div>
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
        <div>
          <button onClick={() => setEditing(!editing)}>
            {editing ? "Cancel Changes" : "Edit Movie"}
          </button>
          <div>
            {editing ? (
              <button
                onClick={() => {
                  deleteMovie();
                  // deleteSavedMovie();
                }}
              >
                Delete Movie
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
