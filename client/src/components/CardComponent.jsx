import { ArrowRight, Download } from "@mui/icons-material";
import React from "react";

const CardComponent = ({ image, title, description, link }) => {
  // Extract the file ID from the Google Drive URL
  const getDownloadLink = (link) => {
    const regex = /(?:drive|docs)\.google\.com\/.*?\/d\/(.*?)(?:[/?]|$)/;
    const match = link.match(regex);
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return link; // Return the original link if no file ID is found
  };

  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center gap-x-2 sm:gap-x-5">
          <a
            href={getDownloadLink(link)}
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-1 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm"
          >
            Download Here
            <Download className="ml-1 " fontSize="30" />
          </a>
          <a
            href={link}
            className="inline-block text-white bg-green-600 hover:bg-green-700 py-1 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm"
          >
            Open Link
            <ArrowRight fontSize="40" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
