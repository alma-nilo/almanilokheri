import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
function AdminUnProtected({ children }) {
  const isAuthenticated = !!Cookies.get("Admin");

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
export default AdminUnProtected;
