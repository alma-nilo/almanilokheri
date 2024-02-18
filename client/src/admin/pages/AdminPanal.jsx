import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutDialogBox from "../components/Logout";
import { AuthApi } from "../../context/user";
import Cookies from "js-cookie";
import axios from "axios";
import MessageBox from "../components/MsgBox";

const Dashboard = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [notificationCount, setnotificationCount] = useState(0);
  const { admin } = AuthApi();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { setadmin, fetchUserReqCount } = AuthApi();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    setadmin(null);
    Cookies.remove("Admin");
    setIsLogoutDialogOpen(false);
    navigate("/adminlogin");
  };

  const fetchUnreadCount = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const apiEndpoint = `${process.env.REACT_APP_API_KEY}/admins/contactUsCount`;

      // Make an HTTP GET request to fetch the unread count
      const response = await axios.get(apiEndpoint);

      // Handle the response (you can customize this part)
      setnotificationCount(response.data.unreadCount);
    } catch (error) {
      // Handle errors (e.g., network issues or server errors)
      // console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    fetchUserReqCount();
  }, [admin]);

  useEffect(() => {
    const checkScreenWidth = () => {
      const screenWidth = window.innerWidth;

      // Define a threshold width below which you consider it a mobile device
      const mobileThreshold = 768; // Adjust this value as needed

      setIsMobile(screenWidth <= mobileThreshold);
    };

    // Check the screen width initially and when the window is resized
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isMobile ? (
          <div className="app">
            <div className="sideFix">
              <Sidebar isSidebar={isSidebar} />
            </div>

            <div className="content">
              <Topbar
                setIsSidebar={setIsSidebar}
                logout={setIsLogoutDialogOpen}
                notificationCount={notificationCount}
                fetchUnreadCount={fetchUnreadCount}
                setShowMessage={setShowMessage}
                showMessage={showMessage}
              />
              <LogoutDialogBox
                isOpen={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
                onLogout={handleLogout}
              />

              {showMessage ? (
                <MessageBox
                  setShowMessage={setShowMessage}
                  fetchUnreadCount={fetchUnreadCount}
                />
              ) : (
                ""
              )}
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 via-purple-500 to-pink-500">
            <div className="p-4 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg shadow-lg text-center">
              <p className="text-lg text-black mb-4">
                Admin Panel not supported for small Screen.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-300"
              >
                Go Home
              </a>
            </div>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
