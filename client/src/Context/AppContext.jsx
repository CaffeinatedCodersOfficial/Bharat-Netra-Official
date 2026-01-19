import { createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

axios.defaults.withCredentials = true; // always send cookies

export const AppContextProvider = ({ children }) => {
  const backendUrl = "https://bharat-netra-official.onrender.com";

  const contextValue = {
    backendUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
