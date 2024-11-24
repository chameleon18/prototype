// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import MainSection from './components/MainSection';
import AboutUs from './components/AboutUs'; // Import the About Us component
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Loginpage from './components/Loginpage';
import Signpage from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* Main page (Home) route */}
          <Route path="/main" element={<><MainSection /></>}/>
          <Route path="/" element={<><HowItWorks /><Footer /></>} />
          
          {/* About Us page route */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/signup" element={<Signpage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
