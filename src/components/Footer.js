import React from 'react';

function Footer() {
  return (
    <footer className="text-center p-8 bg-gray-800 text-white">
      <div className="mb-6">
        <p className="text-sm">OUR JOURNEY SO FAR</p>
        <p className="text-lg font-bold">500K+ Installs</p>
        <p className="text-lg font-bold">₹80K Saved</p>
      </div>
      <div className="space-x-4">
        <a href="#about" className="text-gray-300 hover:text-white">About us</a>
        <a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
        <a href="#terms" className="text-gray-300 hover:text-white">Terms of service</a>
      </div>
      <p className="mt-4 text-gray-400 text-xs">©2024 Chameleon Pvt Ltd. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
