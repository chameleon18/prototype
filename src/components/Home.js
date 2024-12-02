import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import your configured Supabase client

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodItems, setFoodItems] = useState([]); // Food items fetched from Supabase
  const [restaurants, setRestaurants] = useState([]); // Restaurants fetched from Supabase
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch restaurants
        const { data: restaurantData, error: restaurantError } = await supabase
          .from("restaurants")
          .select("*"); // Fetch all restaurants

        if (restaurantError) throw restaurantError;
        setRestaurants(restaurantData);

        // Fetch food items
        const { data: foodData, error: foodError } = await supabase
          .from("food_items")
          .select("*, restaurant_name"); // Include restaurant_name directly

        if (foodError) throw foodError;
        setFoodItems(foodData);

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

  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Foodie Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Food Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoodItems.map((item) => (
            <FoodCard
              key={item.id}
              name={item.name}
              description={item.description}
              restaurant={item.restaurant_name || "Unknown Restaurant"}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name} // Use `name` as the key since it's the primary key
              name={restaurant.name}
              location={restaurant.city}
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

const FoodCard = ({ name, description, restaurant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Restaurant: {restaurant}</p>
    </div>
  );
};

const RestaurantCard = ({ name, location }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">Location: {location}</p>
    </div>
  );
};

export default Home;
