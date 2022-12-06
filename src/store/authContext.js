import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
  username: null,
});

const calculateRemaining = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");

  const remainingTime = calculateRemaining(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedUserId,
  };
};

export const AuthContextProvider = (props) => {
  let localData = getLocalData();

  let initialToken;
  let initialUserId;
  let initialUsername;

  if (localData) {
    initialToken = localData.token;
    initialUserId = localData.userId;
    initialUsername = localData.username;
  }

  const [userId, setUserId] = useState(initialUserId);
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setUsername(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const login = (token, exp, userId, username) => {
    setUserId(userId);
    setToken(token);
    setUsername(username);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", +userId);
    localStorage.setItem("username", username);
    localStorage.setItem("exp", exp);

    const remainingTime = calculateRemaining(exp);

    logoutTimer = setTimeout(logout, remainingTime);
  };

  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logout, localData.duration);
    }
  });

  const contextValue = {
    token,
    userId,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
