import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  return isLogin ? <Home /> : <Navigate to="/LoginSignUp/login" />;
};

export default PrivateRoute;
