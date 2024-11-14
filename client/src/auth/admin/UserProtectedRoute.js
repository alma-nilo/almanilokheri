import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
function UserProtected({ children }) {
  const isAuthenticated = !!Cookies.get("User");

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }
  return children;
}
export default UserProtected;
