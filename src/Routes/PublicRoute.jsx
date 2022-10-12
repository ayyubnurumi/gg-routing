import React from "react";
import { Navigate, Outlet } from "react-router";

const isUserLogin = () => {
  const user = localStorage.getItem("userCredentials")
  if (!user) {
    return false;
  } else {
    return true;
  }
};

export const PublicRoute = () => {
  const getOut = isUserLogin();
  return getOut ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
};
