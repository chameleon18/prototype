import React from 'react';
import phoneImage from '../assets/phone-mockup.png';

function MainSection() {
  return (
    <section className="text-center p-10 bg-gradient-to-b from-green-300 to-green-500 text-white">
      <div className="flex justify-center">
        <img src={phoneImage} alt="App on phones" className="w-1/2 max-w-md" />
      </div>
      <h2 className="mt-10 text-2xl font-semibold">How it works.</h2>
    </section>
  );
}

export default MainSection;
