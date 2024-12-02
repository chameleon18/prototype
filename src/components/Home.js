import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import your configured Supabase client

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]); // Menu items fetched from Supabase
  const [restaurants, setRestaurants] = useState([]); // Restaurants fetched from Supabase
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
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">{dishName}</h3>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-sm text-gray-600 mt-2">Restaurant: {restaurant}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-600">Price (Original): ₹{priceOriginal}</p>
        {priceZomato && <p className="text-sm text-gray-600">Price (Zomato): ₹{priceZomato}</p>}
        {priceSwiggy && <p className="text-sm text-gray-600">Price (Swiggy): ₹{priceSwiggy}</p>}
        {priceOwnWebsite && <p className="text-sm text-gray-600">Price (Own Website): ₹{priceOwnWebsite}</p>}
      </div>
      {additionalDetails && (
        <p className="text-sm text-gray-600 mt-2">{additionalDetails}</p>
      )}
    </div>
  );
};


export default Home;
