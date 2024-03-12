import React from "react";
import { Close } from "@mui/icons-material";

export default function UploadModel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={onClose}
      ></div>
      <div className="z-50  w-full md:w-1/2  relative h-screen flex flex-col item-start bg-white p-8 rounded-lg max-w-md modal-content">
        <div
          onClick={onClose}
          className="absolute top-2 right-4 hover:bg-gray-400 bg-white rounded-full z-20 p-1"
        >
          <Close className="text-red-500 hover:text-gray-100" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

        <p className="text-sm text-gray-600 leading-relaxed text-left">
          This section are in under devlopment{" "}
        </p>
      </div>
    </div>
  );
}
