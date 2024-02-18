import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = ({
  logout,
  notificationCount,
  fetchUnreadCount,
  setShowMessage,
  showMessage,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    if (notificationCount > 0) {
      setShowDot(true);

      // Create a blinking effect by toggling the dot every 1 second
      const intervalId = setInterval(() => {
        setShowDot((prevShowDot) => !prevShowDot);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setShowDot(false);
    }
  }, [notificationCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 300000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          {/* <SearchIcon /> */}
        {/* </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            setShowMessage(!showMessage);
            fetchUnreadCount();
          }}
        >
          <ChatIcon />
          {showDot && (
            <div className={`red-dot ${showMessage ? "hidden" : ""} `}>
              {notificationCount}
            </div>
          )}{" "}
        </IconButton>

        <IconButton>
          <LogoutIcon
            onClick={() => {
              logout(true);
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
