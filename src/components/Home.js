import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls
import { supabase } from "../supabaseClient"; // Import your configured Supabase client

const PEXELS_API_KEY = "YBfp1u2PodBsrhjtHgVksnrvDSMPe64jXtTgYgLnp0cz3bPwftdBJIg4"; // Your Pexels API key

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]); // Menu items fetched from Supabase
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch menu items
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
              menuItems={menuItems.filter(item => item.hostel_name === restaurantName)} // Filter menu items by restaurant name
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
            />
          ))}
        </div>
      </div>
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
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${name}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        // Get the first image from the response
        const images = response.data.photos;
        if (images.length > 0) {
          setImageUrl(images[0].src.medium);
        } else {
          setImageUrl(null); // No image found
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [name]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 rounded-t-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
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
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${dishName}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        const images = response.data.photos;
        if (images.length >= 1) {
          setImageUrl(images[1].src.medium);
        } else if (images.length > 0) {
          setImageUrl(images[0].src.medium); // Fallback to the first image if less than 3 images
        } else {
          setImageUrl(null); // No image found
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [dishName]);

  const toggleComparison = () => {
    setShowComparison((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 rounded-t-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={dishName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
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
      </div>

      {/* Comparison Section */}
      <button
        className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 focus:outline-none"
        onClick={toggleComparison}
      >
        {showComparison ? "Hide Compare" : "Compare"}
      </button>

      {showComparison && (
        <div className="mt-4 bg-gray-100 p-2 rounded-md">
          <p className="text-sm text-gray-600">Price (Zomato): ₹{priceZomato || "N/A"}</p>
          <p className="text-sm text-gray-600">Price (Swiggy): ₹{priceSwiggy || "N/A"}</p>
          <p className="text-sm text-gray-600">Price (Original): ₹{priceOriginal || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
