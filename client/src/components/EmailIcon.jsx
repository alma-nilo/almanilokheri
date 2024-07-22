// FloatingEmailButton.js
import EmailModal from "./EmailModal";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../context/user";
import { EmailOutlined } from "@mui/icons-material";

const EmailButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setuser } = AuthApi();
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpenEmail = () => {
    // mailto:gpnilokheri @hry.nic.in
    //   on open Email logic
  };
  return (
    <div className="fixed bottom-4 z-30 right-4">
      {/* Red circle background */}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-green-500  flex justify-center items-center h-16 w-16 rounded-full p-2 border border-green-600"
      >
        {/* Use Material-UI's IconButton with logout icon */}
        <IconButton aria-label="Send Email to GBN">
          <EmailOutlined className=" text-white font-bold text-2xl" />
        </IconButton>
      </div>
      <EmailModal isOpen={isOpen} onClose={onClose} onOpenEmail={onOpenEmail} />
    </div>
  );
};

export default EmailButton;
