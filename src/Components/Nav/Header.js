import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      Header
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/addMovie">Add Movie</NavLink>
        <NavLink to="/myMovies">My Movies</NavLink>
        <NavLink to="/auth">Auth</NavLink>
      </nav>
      <button onClick={() => authCtx.logout()}>logout</button>
    </div>
  );
};

export default Header;
