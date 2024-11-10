// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="flex justify-between items-center p-5 bg-gradient-to-b from-green-300 to-green-500 text-white">
      <img src={logo} alt="Chameleon Logo" className="h-12" />
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">Home</Link> {/* Home link to main page */}
        <Link to="/about" className="hover:underline">About us</Link> {/* About Us link */}
        <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-green-500 transition">
          Log in / Sign in
        </button>
      </nav>
    </header>
  );
}

export default Header;
