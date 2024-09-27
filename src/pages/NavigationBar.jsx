import React, { useState } from 'react';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import your images
import logo from '../assets/images/logo.svg';


const NavigationBar = () => {
  return (
    <div className="bg-gray-900 text-white">
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
    <div className="flex items-center">
      <img src={logo} alt="Talent Engaged Logo" className="h-10" />
      <Link to="/"><span className="text-xl font-bold ml-2">Talent Engaged</span></Link>
    </div>
    <div className="flex space-x-2">
      <Link to="/">
      <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-3 py-2 rounded-md hover:from-gray-400 hover:to-gray-600">
        Menu
      </button>
      </Link>
      <Link to="/admission">
      <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-3 py-2 rounded-md hover:from-gray-400 hover:to-gray-600">
        Admissions
      </button>
      </Link>
      <Link to="/blog">
        <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-3 py-2 rounded-md hover:from-gray-400 hover:to-gray-600">
          Blog
        </button>
      </Link>
      <Link to="/ai">
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 neon-glow">
          Get Started
        </button>
      </Link>
    </div>
  </header>
  </div>
  );
};

export default NavigationBar;
