import React, { createContext, useContext, useState } from "react";

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap your app and provide cart context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        // If item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If it's a new item, add it to the cart
        return [...prevItems, item];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  // Update quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]); // Resets cart to empty
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
