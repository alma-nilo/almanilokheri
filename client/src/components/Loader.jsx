import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-4">
        <div
          className="h-4 w-4 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 animate-pulse"
          style={{ animationDuration: "0.8s" }}
        ></div>
        <div
          className="h-5 w-5 rounded-full bg-gradient-to-tr from-yellow-400 to-green-500 animate-pulse"
          style={{ animationDuration: "1s" }}
        ></div>
        <div
          className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-green-500 animate-pulse"
          style={{ animationDuration: "1.2s" }}
        ></div>
        <div
          className="h-7 w-7 rounded-full bg-gradient-to-tr from-pink-500 to-red-500 animate-pulse"
          style={{ animationDuration: "1.4s" }}
        ></div>
        <div
          className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-500 to-yellow-400 animate-pulse"
          style={{ animationDuration: "1.6s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
