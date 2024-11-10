
// src/components/MainSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import phoneImage from '../assets/phone-mockup.png';

function MainSection() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)' }} className="min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center p-5 text-white">
        <img src={logo} alt="Chameleon Logo" className="h-12" />
        <nav className="flex items-center space-x-4">
        <Link to="/about" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About us</Link>
        <Link to="/about" className="hover:underline">Contact us</Link>
          <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-green-500 transition">
            Log in / Sign in
          </button>
        </nav>
      </header>

      
      <section className="flex flex-col items-center py-16 ">
        {/* Main Section with Phone Mockups and "How it works" 
        <div className="relative flex justify-center items-center space-x-4 mb-8">
        
          <div className="relative w-1/ max-w-sm">
            <img src={phoneImage} alt="App mockup" className="w-full" />
        
          </div>

        
        </div>*/}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounce">Compare before you order</h1>
      <div className="relative flex justify-center items-center space-x-4 mb-8">
        <img src={phoneImage} alt="App mockup" className="w-1/ max-w-xs " />
        
      </div>
       
      <button className="px-6 py-3 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
        Get Started
      </button>
        
      </section>
      
    </div>
  );
}

export default MainSection;
