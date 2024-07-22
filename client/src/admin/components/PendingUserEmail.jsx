// ! floating Pending User Send Email //
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PendingModal from "./PendingModal";
const PendingUserEmail = ({
  isOpen,
  setIsOpen,
  countOfPending,
  onSendPending,
}) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="fixed bottom-4 z-30 right-4">
      {/* Red circle background */}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-blue-600  flex justify-center items-center h-16 w-16 rounded-full p-2 border border-blue-700"
      >
        {/* Use Material-UI's IconButton with logout icon */}
        <IconButton aria-label="Send Email to GBN">
          <NewReleasesIcon className=" text-white font-bold text-2xl" />
        </IconButton>
      </div>
      <PendingModal
        isOpen={isOpen}
        onClose={onClose}
        onSendPending={onSendPending}
        countOfPending={countOfPending}
      />
    </div>
  );
};

export default PendingUserEmail;
