import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext"; // Correctly import useUser
import phoneImage from "../assets/phone-mockup.png";
import searchIcon from '../assets/Search icon.svg';
import compareIcon from '../assets/com_pric.svg';
import decisionIcon from '../assets/infi dec.svg';
import orderIcon from '../assets/order.svg';

function MainSection() {
  const navigate = useNavigate();
  const { user } = useUser(); // Use the useUser hook to get user data

  const handleGetStarted = () => {
    if (user) {
      navigate("/main");
    } else {
      alert("Please log in to get started");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-background text-neutral-text">
      <section
        style={{
          background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)",
        }}
        className="flex flex-col items-center py-16"
      >
        <h1 className="text-4xl font-bold text-grey-900 mb-8 animate-bounce">
          Compare before you order
        </h1>
        <div className="relative flex justify-center items-center space-x-4 mb-8">
          <img src={phoneImage} alt="App mockup" className="w-full max-w-m" />
        </div>

        <button
          onClick={handleGetStarted}
          className={`px-6 py-3 mt-4 ${
            user ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
          } text-white rounded-full transition`}
          disabled={!user}
        >
          {user ? "Get Started" : "Log in to Get Started"}
        </button>
      </section>
      <section className="p-10 bg-gray-100">
      {/* Section Title */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">How it works.</h2>

      {/* Icons Section */}
      <div className="flex flex-wrap justify-evenly gap-10 mb-12">
        <div className="text-center w-44">
          <img src={searchIcon} alt="Search icon" className="h-[174px] w-[180.03px] mx-auto mb-2" />
          <p className="text-gray-700 whitespace-nowrap">Search for your Dish</p>
        </div>
        <div className="text-center w-44">
          <img src={compareIcon} alt="Compare icon" className="h-[174px] w-[180.03px] mx-auto mb-2" />
          <p className="text-gray-700 whitespace-nowrap">Compare Prices</p>
        </div>
        <div className="text-center w-44">
          <img src={decisionIcon} alt="Decision icon" className="h-[174px] w-[180.03px] mx-auto mb-2" />
          <p className="text-gray-700 whitespace-nowrap">Make an Informed Decision</p>
        </div>
        <div className="text-center w-44">
          <img src={orderIcon} alt="Order icon" className="h-[174px] w-[180.03px] mx-auto mb-2" />
          <p className="text-gray-700 whitespace-nowrap">Place Your Order</p>
        </div>
      </div>


      {/* Our Journey Section */}
      <div className="mb-6 bg-white py-8">
        <p className="text-[30px] font-light mb-4">OUR JOURNEY SO FAR</p>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">500K+</p>
            <p className="text-sm font-light">Installs</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">₹80K</p>
            <p className="text-sm font-light">Saved</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default MainSection;