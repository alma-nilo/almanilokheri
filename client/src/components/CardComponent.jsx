import React from 'react';

const CardComponent = ({ image, title, description, link }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img src={image} alt={title}  className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a href={link} className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-sm" download>
            Download From Here
        </a>
      </div>
    </div>
  );
};

export default CardComponent;
