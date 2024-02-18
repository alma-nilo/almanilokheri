import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
function UnProtected({ isSignedIn, children }) {
  const isAuthenticated = !!Cookies.get("Auth");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default UnProtected;
