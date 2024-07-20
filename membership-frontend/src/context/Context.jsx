import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const authUrl = "http://localhost:5000/api/auth";
  const membersUrl = "http://localhost:5000/api/members";

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser(username);
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post(`${authUrl}/login`, formData);
      const { token, username } = response.data;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
        setUser(localStorage.getItem("username"));
      }
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(`${authUrl}/register`, formData);
    } catch (error) {
      // console.log("register error: ", error);
      throw new Error(error.response?.data?.message);
    }
  };

  const addMember = async (formData) => {
    try {
      const response = await axios.post(`${membersUrl}`, formData);
      return response;
    } catch (error) {
      // console.log(error);
      throw new Error(error.response?.data?.message);
    }
  };

  const getAllMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${membersUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.log("couldnt get memebers: ", error);
      throw new Error(error.response?.data?.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addMember,
        isAuthenticated,
        getAllMembers,
        logout,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
