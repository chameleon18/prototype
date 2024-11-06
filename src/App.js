import React from 'react';
import './App.css';
import Header from './components/Header';
import MainSection from './components/MainSection';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
