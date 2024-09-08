// AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { loginAPI } from "../api/login";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authState, setAuthState] = useState({
    token: null,
    role: null,
    username: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    if (token && role && username) {
      setAuthState({ token, role, username });
    }
  }, []);

  const login = async (inputUsername, password) => {
    const res = await loginAPI({
      user_name: inputUsername,
      password,
    });
    const { token, role, username } = res;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    setAuthState({ token, role, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthState({ token: null, role: null });
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, authState, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
