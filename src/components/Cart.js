import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext"; 
import RingLoaderComponent from "../components/RingLoader"; // Import the loader component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart(); // Access clearCart function
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for cart operations
  const [paymentMethod, setPaymentMethod] = useState(""); // State to hold selected payment method
  const [orderSuccess, setOrderSuccess] = useState(false); // State to track order success
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Simulate loading state for cart items (example)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    setLoading(true); // Show loader when removing item
    removeFromCart(itemId);
    setTimeout(() => setLoading(false), 500); // Hide loader after operation
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setLoading(true); // Show loader when updating quantity
    updateQuantity(itemId, newQuantity);
    setTimeout(() => setLoading(false), 500); // Hide loader after operation
  };

  const handleToggleCheckout = () => {
    setIsCheckoutVisible(!isCheckoutVisible);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value); // Update payment method
  };

  const handleOrderSuccess = () => {
    // Simulate order success and hide checkout
    setOrderSuccess(true);
    setIsCheckoutVisible(false);
  };

  const handleCloseModal = () => {
    setOrderSuccess(false); // Hide the modal
    clearCart(); // Clear the cart
    navigate("/main"); // Navigate back to the main page
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.priceOriginal * item.quantity), 0);

  return (
    <div className="cart-container p-4 bg-white rounded-lg shadow-md min-h-screen flex flex-col">
      {/* Show loader if loading state is true */}
      {loading ? (
        <RingLoaderComponent loading={loading} size={60} color="#3498db" />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-center text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item flex justify-between items-center p-4 border-b">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.dishName} className="w-25 h-25 object-cover rounded-lg mr-6" />
                      <div>
                        <h3 className="text-4xl font-semibold">{item.dishName}</h3>
                        <p className="text-xl text-gray-500">{item.restaurant}</p>
                        <div className="flex items-center mt-2">
                          <button
                            className="text-gray-500 text-2xl"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-4 text-2xl">{item.quantity}</span>
                          <button
                            className="text-gray-500 text-2xl"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-xl">₹{item.priceOriginal * item.quantity}</p>
                      <button
                        className="text-red-500 text-sm mt-2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment method selection moved here */}
              <div className="payment-method mt-4">
                <h4 className="text-lg font-semibold">Select Payment Method</h4>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  <label htmlFor="upi" className="text-lg">UPI</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="onlineBanking"
                    name="paymentMethod"
                    value="Online Banking"
                    checked={paymentMethod === "Online Banking"}
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  <label htmlFor="onlineBanking" className="text-lg">Online Banking</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  <label htmlFor="cod" className="text-lg">Cash on Delivery (COD)</label>
                </div>
              </div>

              <div className="cart-summary p-4 mt-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-semibold text-lg">₹{totalPrice}</span>
                </div>

                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleOrderSuccess} // Trigger order success on checkout
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold text-green-600">You have ordered successfully!</h3>
            <p className="text-lg">Thank you for your order. We will process it soon.</p>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleCloseModal} // Close modal, clear cart and navigate to main page
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
