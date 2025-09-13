// components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
