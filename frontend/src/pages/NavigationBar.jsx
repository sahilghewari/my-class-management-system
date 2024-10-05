import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Import icons for mobile menu
import logo from '../assets/images/logo.svg';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="flex justify-between items-center p-4 shadow-lg">
        <div className="flex items-center">
          <img src={logo} alt="Talent Engaged Logo" className="h-10" />
          <Link to="/">
            <span className="text-xl font-bold ml-2">Talent Engaged</span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/">
            <button className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Menu
            </button>
          </Link>
          <Link to="/admission">
            <button className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Admissions
            </button>
          </Link>
          <Link to="/blog">
            <button className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Blog
            </button>
          </Link>
          {/* Conditional rendering based on authentication status */}
          {!isAuthenticated ? (
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300">
                Log In
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition duration-300"
            >
              Log Out
            </button>
          )}
        </nav>
      </header>
      
      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-2">
          <Link to="/" onClick={toggleMenu}>
            <button className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Menu
            </button>
          </Link>
          <Link to="/admission" onClick={toggleMenu}>
            <button className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Admissions
            </button>
          </Link>
          <Link to="/blog" onClick={toggleMenu}>
            <button className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-800 transition duration-300">
              Blog
            </button>
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" onClick={toggleMenu}>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300">
                Log In
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition duration-300"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
