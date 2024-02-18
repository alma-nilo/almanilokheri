import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-4 border-green-500 rounded-full animate-spin">
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
