// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="text-center p-4 bg-gray-800 text-white">
      {/* Footer Links and Copyright Section */}
      <div className="bg-gray-800 py-4">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#about" className="text-gray-300 hover:text-white">About us</a>
          <a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
          <a href="#terms" className="text-gray-300 hover:text-white">Terms of service</a>
        </div>
        <p className="text-xs text-gray-500">©2024 Chameleon Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
