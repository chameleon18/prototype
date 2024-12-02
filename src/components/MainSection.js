import React from "react";
import phoneImage from "../assets/phone-mockup.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function MainSection() {
  const navigate = useNavigate(); // Use navigate to programmatically navigate between pages

  // Function to handle the button click
  const handleGetStarted = () => {
    // Example: Navigate to a new page or trigger an action
    navigate("/main"); // Replace with your desired page or action
  };

  return (
    <div className="min-h-screen bg-neutral-background text-neutral-text">
      <section style={{ background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)" }}  className="flex flex-col items-center py-16">
        {/* Main Section with Phone Mockups */}
        <h1 className="text-4xl font-bold text-grey-900 mb-8 animate-bounce">
          Compare before you order
        </h1>
        <div className="relative flex justify-center items-center space-x-4 mb-8">
          <img
            src={phoneImage}
            alt="App mockup"
            className="w-1/ max-w-xs"
          />
        </div>
        <button
          onClick={handleGetStarted} // Bind the onClick handler to the button
          className="px-6 py-3 mt-4 bg-green-500 text-white rounded-full hover:bg-green-700 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default MainSection;
