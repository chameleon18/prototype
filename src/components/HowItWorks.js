// src/components/HowItWorks.js
import React from 'react';
import searchIcon from '../assets/Search icon.svg';
import compareIcon from '../assets/com_pric.svg';
import decisionIcon from '../assets/infi dec.svg';
import orderIcon from '../assets/order.svg';

function HowItWorks() {
  return (
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
  );
}

export default HowItWorks;
