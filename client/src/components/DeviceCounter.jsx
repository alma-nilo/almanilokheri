import React from "react";

const DeviceCounter = ({ deviceCount }) => {
  return (
    <div className="fixed bottom-0 right-2 sm:right-0 p-2 bg-gray-700 z-50 text-white rounded-tl-md">
      <p className="text-xs">Devices visited: {deviceCount}</p>
    </div>
  );
};

export default DeviceCounter;
