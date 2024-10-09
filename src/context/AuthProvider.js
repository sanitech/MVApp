import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/v1/users/me");
        setUser(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log("finsh", user);
  }, []);

  const login = async (response) => {
    try {
      // Redirect or perform other actions here
      const user = response.userData;
      localStorage.setItem("userData", JSON.stringify(user));
      console.log("first", user);
      setUser(user);
      setIsLoading(false);
      if (user?.role.toLowerCase() === "admin") {
        navigate("admin/dashboard");
      } else if (user?.role.toLowerCase() === "vendor") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post("/v1/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      const response = await axios.post("/v1/auth/logout");
      setUser(null);
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
