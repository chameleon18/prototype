// SearchBar Component
import React from "react";

const Searchbar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for dishes..."
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default Searchbar;
