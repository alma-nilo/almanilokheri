import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
function AdminProtected({ children }) {
  const isAuthenticated = !!Cookies.get("Admin");

  if (!isAuthenticated) {
    return <Navigate to="/adminlogin" replace />;
  }
  return children;
}
export default AdminProtected;
