import React from "react";

const FoodCard = ({
  dishName,
  category,
  priceOriginal,
  priceZomato,
  priceSwiggy,
  priceOwnWebsite,
  additionalDetails,
  restaurant,
  imageUrl,
  onCompareClick,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={imageUrl}
          alt={dishName}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{dishName}</h3>
          <p className="text-sm text-gray-500">{category || "Unknown Category"}</p>
        </div>
      </div>

      <p className="text-sm mb-2">
        <strong>Restaurant:</strong> {restaurant}
      </p>

      <div className="text-sm mb-2">
        {priceOriginal && <p>Original Price: ₹{priceOriginal}</p>}
      </div>

      {additionalDetails && (
        <p className="text-sm text-gray-600 mb-2">{additionalDetails}</p>
      )}

      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => onCompareClick({
            dishName,
            priceOriginal,
            priceZomato,
            priceSwiggy,
            priceOwnWebsite,
            imageUrl,
            restaurant,  // Pass the restaurant name here
          })}
        >
          Compare
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => onAddToCart({
            id: Math.random(),  // Generate a unique ID for the item
            dishName,
            priceOriginal,
            priceZomato,
            priceSwiggy,
            priceOwnWebsite,
            imageUrl,
            restaurant,
            quantity: 1,  // Default quantity
          })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
