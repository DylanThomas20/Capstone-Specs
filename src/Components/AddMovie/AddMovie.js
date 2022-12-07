import { useContext, useState } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const AddMovie = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");

  const addMovie = (e) => {
    e.preventDefault();
    const body = { movieTitle, moviePoster };

    axios
      .post(`/movie/${authCtx.userId}`, body, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={(e) => addMovie(e)}>
        <input
          placeholder="Movie Title"
          type="text"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          placeholder="Movie Poster"
          type="text"
          onChange={(e) => setMoviePoster(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddMovie;
