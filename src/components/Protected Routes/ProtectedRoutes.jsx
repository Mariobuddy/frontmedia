import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, isAuth }) => {
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
