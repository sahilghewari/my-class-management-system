import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import your images
import logo from '../assets/images/logo.svg';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check authentication status

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Optional: Clear token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <div className="flex items-center">
          <img src={logo} alt="Talent Engaged Logo" className="h-10" />
          <Link to="/">
            <span className="text-xl font-bold ml-2">Talent Engaged</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/">
            <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-4 py-2 rounded-md hover:from-gray-400 hover:to-gray-600 transition duration-300">
              Menu
            </button>
          </Link>
          <Link to="/admission">
            <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-4 py-2 rounded-md hover:from-gray-400 hover:to-gray-600 transition duration-300">
              Admissions
            </button>
          </Link>
          <Link to="/blog">
            <button className="bg-gradient-to-r from-gray-300 to-gray-500 text-black px-4 py-2 rounded-md hover:from-gray-400 hover:to-gray-600 transition duration-300">
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
        </div>
      </header>
    </div>
  );
};

export default NavigationBar;
