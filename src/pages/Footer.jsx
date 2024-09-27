import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="px-8 py-16 bg-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg mb-4 md:mb-0">
            <p>&copy; 2023 Talent Engaged</p>
          </div>
          <div className="flex flex-wrap">
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg mr-4 mb-2 hover:text-purple-500"
            >
              <FaFacebook className="inline-block mr-1" /> Facebook
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg mr-4 mb-2 hover:text-purple-500"
            >
              <FaTwitter className="inline-block mr-1" /> Twitter
            </a>
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg mr-4 mb-2 hover:text-purple-500"
            >
              <FaInstagram className="inline-block mr-1" /> Instagram
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer