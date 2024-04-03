// FloatingLogoButton.js
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LogoutDialogBox from "./LogoutDilogBox";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../context/user";

const FloatingLogoutButton = () => {
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();
  const { setuser } = AuthApi();
  const onClose = () => {
    setisOpen(false);
  };
  const onLogout = () => {
    Cookies.remove("User");
    setuser(null);
    navigate("/signup");
  };
  return (
    <div className="fixed bottom-4 z-30 right-4">
      {/* Red circle background */}
      <div
        onClick={() => {
          setisOpen(true);
        }}
        className="bg-red-500  rounded-full p-2"
      >
        {/* Use Material-UI's IconButton with logout icon */}
        <IconButton aria-label="logout">
          <PowerSettingsNewIcon />
        </IconButton>
      </div>
      <LogoutDialogBox isOpen={isOpen} onClose={onClose} onLogout={onLogout} />
    </div>
  );
};

export default FloatingLogoutButton;
