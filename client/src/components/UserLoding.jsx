import React from "react";

const Spinner = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <svg
        className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 20h4a7.963 7.963 0 01-2-5.291L6 17l0 .001zM12 20a7.963 7.963 0 01-2-5.291l2-2.72A5.965 5.965 0 0012 15v5h0zm4-2.709A7.962 7.962 0 0020 12h-4a7.963 7.963 0 01-2 5.291l2 2.719 0-.001z"
        />
      </svg>
      <span className="text-green-600 animate-wave">
        {" "}
        Hold on {text} are Loading...
      </span>
    </div>
  );
};

export default Spinner;
