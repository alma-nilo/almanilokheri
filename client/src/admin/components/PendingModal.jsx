import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const PendingModal = ({ isOpen, onClose, onSendPending, countOfPending }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <div
        style={{
          backgroundColor: colors.grey[100],
        }}
        className="relative h-52 w-80  p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-gray-800 mb-4">Email to Pending Users</h2>
        <p className="text-gray-700 mb-4">
          Send Email to {countOfPending} pending Users at one Click
        </p>
        <div className="flex justify-around items-center">
          <button
            onClick={onSendPending}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
            style={{
              backgroundColor: colors.blueAccent[700],
            }}
          >
            Send Email
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

export default PendingModal;
