import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import RingLoaderComponent from "../RingLoader";
import { useCart } from "../CartContext"; // Import the cart context
import SearchBar from "./Searchbar";
import RestaurantCard from "./Restaurantcard";
import FoodCard from "./Foodcard";

const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]); // Ensure menuItems is initialized as an empty array
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const { cart = [], addToCart } = useCart(); // Ensure cart is an empty array if undefined

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making the API call

        const { data: menuData, error: menuError } = await supabase
          .from("menu_items")
          .select("*");

        if (menuError) throw menuError;
        setMenuItems(menuData || []); // Ensure menuData is handled safely
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurs
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item) => {
    addToCart(item); // Use the `addToCart` function from the context
    alert(`${item.dishName} added to cart!`);
  };

  const handleCompareClick = (dish) => {
    console.log(dish); // Log the data to verify it's correct
    setSelectedDish(dish); // Set the selected dish for comparison
  };

  const closeComparison = () => {
    setSelectedDish(null); // Close the comparison modal
  };

  const restaurantNames = [...new Set(menuItems?.map((item) => item.hostel_name) || [])];

  const filteredMenuItems = menuItems?.filter((item) =>
    item?.dish_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading) {
    return <RingLoaderComponent loading={loading} />; // Show the loader component while loading
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        <span className="text-green-500">Foodie</span> Finder
      </h1>
      <SearchBar onSearch={handleSearch} />

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">
          <span className="text-green-500">Resta</span>urants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurantNames.length > 0 ? (
            restaurantNames.map((restaurantName, index) => (
              <RestaurantCard
                key={index}
                name={restaurantName}
                menuItems={menuItems.filter(
                  (item) => item.hostel_name === restaurantName
                )}
              />
            ))
          ) : (
            <p>No restaurants available.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">
          <span className="text-green-500">Menu</span> Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <FoodCard
                key={item.id}
                dishName={item.dish_name}
                category={item.category}
                imageUrl={item.image_url || DEFAULT_IMAGE_URL}
                onCompareClick={handleCompareClick}
                onAddToCart={handleAddToCart} // Use the cart function
                priceOriginal={item.price_original}
                priceZomato={item.price_zomato}
                priceSwiggy={item.price_swiggy}
                priceOwnWebsite={item.price_own_website}
                restaurant={item.hostel_name}
              />
            ))
          ) : (
            <p>No menu items found.</p>
          )}
        </div>
      </div>

      {selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full flex">
            <div className="flex-shrink-0 w-1/3">
              {selectedDish.imageUrl ? (
                <img
                  src={selectedDish.imageUrl}
                  alt={selectedDish.dishName}
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            <div className="ml-6 flex-1">
              <h3 className="text-2xl font-bold mb-4">{selectedDish.dishName}</h3>
              <p className="mb-2">
                <strong>Restaurant:</strong> {selectedDish.restaurant || "Unknown"}
              </p>

              <div className="mb-4">
                <p>
                  <strong>Zomato Price:</strong> ₹{selectedDish.priceZomato || "N/A"}
                </p>
                <p>
                  <strong>Swiggy Price:</strong> ₹{selectedDish.priceSwiggy || "N/A"}
                </p>
                <p>
                  <strong>Own Website Price:</strong> ₹{selectedDish.priceOwnWebsite || "N/A"}
                </p>
              </div>

              <button
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 absolute top-2 right-2"
                onClick={closeComparison}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
