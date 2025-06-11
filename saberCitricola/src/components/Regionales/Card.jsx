import React from 'react';

const Card = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-80">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
