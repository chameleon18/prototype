import React from "react";

const RestaurantCard = ({ name, menuItems }) => {
  const foodImageUrl = menuItems[5]?.image_url || "https://via.placeholder.com/150"; // First item image

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={foodImageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-2">{name}</h3>
      <p className="text-gray-600">4.3⭐</p>
    </div>
  );
};

export default RestaurantCard;
