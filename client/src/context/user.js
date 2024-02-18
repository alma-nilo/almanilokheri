import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [admin, setadmin] = useState(null);
  const [userReqNotification, setUserReqNotification] = useState(0);

  const Admin = () => {
    if (Cookies.get("Admin")) {
      setadmin(JSON.parse(Cookies.get("Admin")));
    } else {
      setadmin(null);
    }
  };
  const User = () => {
    if (Cookies.get("User")) {
      setuser(JSON.parse(Cookies.get("User")));
    } else {
      setuser(null);
    }
  };

  const fetchUserReqCount = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const apiEndpoint = `${process.env.REACT_APP_API_KEY}/admins/UserReqCount`;

      // Make an HTTP GET request to fetch the unread count
      const response = await axios.get(apiEndpoint);

      // Handle the response (you can customize this part)
      setUserReqNotification(response.data.unreadCount);
      // //console.log("count", response.data.unreadCount);
    } catch (error) {
      // Handle errors (e.g., network issues or server errors)
      // console.error("API Error:", error);
    }
  };

  useEffect(() => {
    Admin();
    User();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        admin,
        setadmin,
        fetchUserReqCount,
        userReqNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthApi = () => {
  return useContext(AuthContext);
};
