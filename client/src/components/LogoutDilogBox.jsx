import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const LogoutDialogBox = ({ isOpen, onClose, onLogout }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      }`}
      style={{
        backdropFilter: isOpen ? "blur(8px)" : "none",
        zIndex: isOpen ? 999 : -1,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-75"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-800 mb-4">Logout Confirmation</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialogBox;
