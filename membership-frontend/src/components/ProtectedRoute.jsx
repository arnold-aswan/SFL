import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/Context";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
