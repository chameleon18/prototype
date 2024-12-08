// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importing components
import MainSection from './components/MainSection';
import AboutUs from './components/AboutUs'; // Import the About Us component
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Loginpage from './components/Loginpage';

import Contact from './components/Contact';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/Home';

// Importing UserProvider
import { UserProvider } from './components/UserContext'; // UserProvider for shared authentication state

function App() {
  return (
    <UserProvider>  {/* Wrap the entire app with UserProvider */}
      <Router>
        <div className="App">
          <Routes>
            {/* Main page (Home) route */}
            <Route path="/" element={<><Header/><MainSection /><HowItWorks /><AboutUs/><Footer/></>} />
            
            {/* About Us page route */}
            <Route path="/about" element={<><Header/><AboutUs /></>} />
            <Route path='/contactus' element={<><Header/><Contact/></>} />
            <Route path="/login" element={<Loginpage/>} />

            {/* Main section and hero section */}
            <Route path='/main' element={<><Header/><Hero/><Home/><Footer/></> } />
          </Routes>
        </div>
      </Router>
    </UserProvider>  
  );
}

export default App;
