// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MainSection from './components/MainSection';
import AboutUs from './components/AboutUs'; // Import the About Us component
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* Main page (Home) route */}
          <Route path="/" element={<><MainSection /><HowItWorks /><Footer /></>} />
          
          {/* About Us page route */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
