import { createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

axios.defaults.withCredentials = true; // always send cookies

export const AppContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:4000";

  const contextValue = {
    backendUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
