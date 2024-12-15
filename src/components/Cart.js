import React, { useState } from "react";
import { useCart } from "./CartContext"; // Assuming you're using context to manage the cart state

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleToggleCheckout = () => {
    setIsCheckoutVisible(!isCheckoutVisible);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-container p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item flex justify-between items-center p-2 border-b">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.dishName} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.dishName}</h3>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                    <div className="flex items-center">
                      <button
                        className="text-gray-500"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="text-gray-500"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                  <button
                    className="text-red-500 text-sm mt-1"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary p-4 mt-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleToggleCheckout}
            >
              {isCheckoutVisible ? "Hide Checkout" : "Proceed to Checkout"}
            </button>
          </div>

          {isCheckoutVisible && (
            <div className="checkout-section mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Checkout</h3>
              <p className="text-lg">Total Price: ₹{totalPrice}</p>
              {/* Add more checkout details here, e.g., delivery address, payment options */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
