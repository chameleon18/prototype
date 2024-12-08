import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext"; // Correctly import useUser
import phoneImage from "../assets/phone-mockup.png";

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
    </div>
  );
}

export default MainSection;
