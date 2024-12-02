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
import Contact from './components/Contact';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* Main page (Home) route */}
          <Route path="/" element={<><Header/><MainSection /><HowItWorks /><Footer/></>} />
          
          {/* About Us page route */}
          <Route path="/about" element={<><Header/><AboutUs /></>} />
          <Route path='/contactus' element={<><Header/><Contact/></>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/signup" element={<Signpage/>} />

          <Route path='/main' element={<><Header/><Hero/><Home/><Footer/></> }></Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
