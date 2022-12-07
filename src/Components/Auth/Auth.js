import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleAuth = (e) => {
    e.preventDefault();
    const body = { username, password };
    axios
      .post(`${register ? `/register` : "/login"}`, body, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(authCtx);
        const { token, exp, userId, username } = res.data;
        authCtx.login(token, exp, userId, username);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Welcome to our site! {register ? "Register" : "Login"} below!</h1>
      {register ? (
        <div>
          <form onSubmit={(e) => handleAuth(e)}>
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => handleAuth(e)}>
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button>Submit</button>
          </form>
        </div>
      )}

      <button onClick={() => setRegister(!register)}>
        {register ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default Auth;
