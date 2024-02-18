import React, { useState } from "react";

const GalleryCard = ({ image, handleImageClick }) => {
  return (
    <div
      onClick={() => {
        handleImageClick(image);
      }}
      className="flex-shrink-0 hover:cursor-pointer"
    >
      <div className="relative w-64 h-72 mx-4 my-2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-500">
        <img
          src={image.Document}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            {image.Title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
