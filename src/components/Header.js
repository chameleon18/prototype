import React from 'react';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-100">
      <img src={logo} alt="Chameleon Logo" className="h-12" />
      <nav className="flex items-center space-x-4">
        <a href="#about" className="text-gray-700">About us</a>
        <button className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-200">
          Log in / Sign in
        </button>
      </nav>
    </header>
  );
}

export default Header;
