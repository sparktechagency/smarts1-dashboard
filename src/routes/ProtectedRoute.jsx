import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";


const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = Cookies.get("accessToken"); // Replace with actual authentication logic

  if(isAuthenticated) {
    return children;
  }

  return <Navigate to="auth/login" state={{ from: location }} />;
};

export default PrivateRoute;