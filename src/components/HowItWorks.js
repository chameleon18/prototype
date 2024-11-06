import React from 'react';

function HowItWorks() {
  return (
    <section className="flex justify-center gap-8 p-10 bg-white">
      <div className="text-center">
        <img src="search-icon.png" alt="Search icon" className="h-12 mx-auto" />
        <p className="mt-2 text-gray-700">Search for your Dish</p>
      </div>
      <div className="text-center">
        <img src="compare-icon.png" alt="Compare icon" className="h-12 mx-auto" />
        <p className="mt-2 text-gray-700">Compare Prices</p>
      </div>
      <div className="text-center">
        <img src="decision-icon.png" alt="Decision icon" className="h-12 mx-auto" />
        <p className="mt-2 text-gray-700">Make an Informed Decision</p>
      </div>
      <div className="text-center">
        <img src="order-icon.png" alt="Order icon" className="h-12 mx-auto" />
        <p className="mt-2 text-gray-700">Place Your Order</p>
      </div>
    </section>
  );
}

export default HowItWorks;
