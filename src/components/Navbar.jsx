// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Classes Management</Link>
        </div>
        <div className="space-x-4">
          <Link to="/admissions" className="hover:underline">Admissions</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="bg-white text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-200">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
