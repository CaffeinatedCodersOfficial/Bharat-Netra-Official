import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.withCredentials = true; // always send cookies

export const AppContextProvider = ({ children }) => {
  // const backendUrl = "https://bharat-netra-official.onrender.com";
  const backendUrl = "http://localhost:4000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [todaysData, setTodaysData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/user-data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (err) {
      setUserData(null);
      setError(err.message);
      toast.error(err.message);
    }
  };

  //fetch today's Data
  const fetchTodaysData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/todays-data`);
      if (data.success) {
        setTodaysData(data.apiData);
      } else {
        setTodaysData(null);
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (err) {
      setTodaysData(null);
      setError(err.message);
      toast.error(err.message);
    }
  };

  //fetch weeks's Data
  const fetchWeekData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/week-data`);
      if (data.success) {
        setWeekData(data.apiData);
      } else {
        setWeekData(null);
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (err) {
      setWeekData(null);
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Check auth status
  const checkAuth = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedIn(true);
        await fetchUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserData(null);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    todaysData,
    fetchTodaysData,
    weekData,
    fetchWeekData,
    loading,
    error,
    checkAuth,
    refreshAuth: checkAuth,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
