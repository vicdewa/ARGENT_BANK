import React from 'react'; 
import '../../css/main.css';
import Hero from '../components/Hero'; 
import Features from '../components/Features';

function Homepage() {
  return (
    <>
      {/* Composant Hero */}
      <Hero />

      {/* Composant Features */}
      <Features />
    </>
  );
}

export default Homepage;
