import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import your configured Supabase client

const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150"; // Placeholder image URL

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]); // Menu items fetched from Supabase
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedDish, setSelectedDish] = useState(null); // State to store the selected dish for comparison

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch menu items from Supabase
        const { data: menuData, error: menuError } = await supabase
          .from("menu_items")
          .select("*"); // Fetch all menu items

        if (menuError) throw menuError;
        setMenuItems(menuData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Extract unique restaurant names
  const restaurantNames = [
    ...new Set(menuItems.map((item) => item.hostel_name)), // Set to get unique values
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.dish_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompareClick = (dish) => {
    setSelectedDish(dish); // Set the selected dish for comparison
  };

  const closeComparison = () => {
    setSelectedDish(null); // Close the comparison
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Foodie Finder</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Restaurant Cards */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurantNames.map((restaurantName, index) => (
            <RestaurantCard
              key={index}
              name={restaurantName}
              menuItems={menuItems.filter(
                (item) => item.hostel_name === restaurantName
              )} // Filter menu items by restaurant name
            />
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenuItems.map((item) => (
            <FoodCard
              key={item.id}
              dishName={item.dish_name}
              category={item.category}
              priceOriginal={item.price_original}
              priceZomato={item.price_zomato}
              priceSwiggy={item.price_swiggy}
              priceOwnWebsite={item.price_own_website}
              additionalDetails={item.additional_details}
              restaurant={item.hostel_name || "Unknown Restaurant"}
              imageUrl={item.image_url || DEFAULT_IMAGE_URL} // Use the image_url from Supabase
              onCompareClick={handleCompareClick} // Pass the compare click handler
            />
          ))}
        </div>
      </div>

      {/* Comparison Modal */}
      {selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Compare Prices for {selectedDish.dish_name}</h3>
            <p className="mb-2">Restaurant: {selectedDish.hostel_name || "Unknown"}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Original Price: ₹{selectedDish.price_original}</p>
              {selectedDish.price_zomato && (
                <p className="text-sm text-gray-600">Zomato Price: ₹{selectedDish.price_zomato}</p>
              )}
              {selectedDish.price_swiggy && (
                <p className="text-sm text-gray-600">Swiggy Price: ₹{selectedDish.price_swiggy}</p>
              )}
              {selectedDish.price_own_website && (
                <p className="text-sm text-gray-600">Own Website Price: ₹{selectedDish.price_own_website}</p>
              )}
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              onClick={closeComparison}
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        className="border rounded-lg w-3/4 md:w-1/2 p-2 focus:outline-none focus:ring focus:ring-green-300"
        placeholder="Search for food or restaurants..."
        value={searchInput}
        onChange={handleInputChange}
      />
    </div>
  );
};

const RestaurantCard = ({ name, menuItems }) => {
  const imageUrl = menuItems[0]?.image_url || DEFAULT_IMAGE_URL; // Use the image_url of the first item, fallback to default

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <h3 className="text-lg font-bold mt-4">{name}</h3>
      <p className="text-sm text-gray-600 mt-2">{menuItems.length} Items Available</p>
    </div>
  );
};

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
  onCompareClick, // Added compare click handler
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={dishName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">{dishName}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-sm text-gray-600 mt-2">Restaurant: {restaurant}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Price (Own Website): ₹{priceOwnWebsite}</p>
        </div>
        {additionalDetails && (
          <p className="text-sm text-gray-600 mt-2">{additionalDetails}</p>
        )}
        <button
          className="mt-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
          onClick={() => onCompareClick({ dishName, hostel_name: restaurant, price_original: priceOriginal, price_zomato: priceZomato, price_swiggy: priceSwiggy, price_own_website: priceOwnWebsite })}
        >
          Compare Prices
        </button>
      </div>
    </div>
  );
};

export default Home;
