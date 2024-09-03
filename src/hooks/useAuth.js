"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const payload = jwtDecode(token);
      setIsLogin(true);
      setUser(payload);
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token);
    const payload = jwtDecode(token);
    setIsLogin(true);
    setUser(payload);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLogin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
