import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
function UserUnProtected({ children }) {
  const isAuthenticated = !!Cookies.get("User");

  if (isAuthenticated) {
    return <Navigate to="/alumni" replace />;
  }
  return children;
}
export default UserUnProtected;
