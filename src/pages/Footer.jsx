import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="px-8 py-16 bg-gradient-to-r from-gray-900 to-gray-700">
      <section className="px-8 py-16 rounded-lg bg-gray-800 bg-opacity-90">
        <h2 className="text-4xl font-bold mb-4 neon-glow text-purple-400">Ready to Get Started?</h2>
        <p className="text-lg mb-6 text-gray-300">Join our vibrant community of learners and educators.</p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 neon-glow transition-transform transform hover:scale-105">
          Get Started
        </button>
      </section>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="text-lg mb-4 md:mb-0 text-gray-200">
          <p>&copy; 2023 Talent Engaged</p>
        </div>
        <div className="flex flex-wrap">
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg mr-4 mb-2 text-gray-200 hover:text-purple-500 transition-colors duration-300"
          >
            <FaFacebook className="inline-block mr-1" /> Facebook
          </a>
          <a 
            href="https://www.twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg mr-4 mb-2 text-gray-200 hover:text-purple-500 transition-colors duration-300"
          >
            <FaTwitter className="inline-block mr-1" /> Twitter
          </a>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg mr-4 mb-2 text-gray-200 hover:text-purple-500 transition-colors duration-300"
          >
            <FaInstagram className="inline-block mr-1" /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
