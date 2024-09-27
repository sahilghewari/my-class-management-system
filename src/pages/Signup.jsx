import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your assets
import logo from '../assets/images/logo.svg'; // Update with your logo path

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // Include the role in the request
      });

      if (response.data.success) {
        // Store the role in local storage
        localStorage.setItem('role', formData.role);
        // Redirect to the same page or another page
        navigate('/'); // Redirect to the desired page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred during registration. Please try again.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #001f3f, #001844, #09173b, #081135)', // Sci-fi gradient
        backgroundSize: '400% 400%', 
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      {/* 3D Card Container */}
      <div 
        className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-purple-500 neon-border max-w-md w-full transform scale-95 opacity-0 animate-fadeInUp"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Talent Engaged Logo" className="h-12 animate-pulse" />
        </div>

        <h2 className="text-3xl text-white font-bold text-center mb-4">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Join Talent Engaged and start learning today!
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* 3D Input Fields */}
          <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Full Name"
              required
            />
          </div>

          <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your-email@example.com"
              required
            />
          </div>

          <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
            <label className="block text-gray-300 mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* 3D Button with Hover Effect */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-md hover:shadow-lg hover:scale-105 transform transition-all duration-500 neon-glow"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Add animations for 3D effect */}
      <style>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .neon-border {
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.7), 0 0 30px rgba(138, 43, 226, 0.5);
        }

        .neon-glow {
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(138, 43, 226, 0.5);
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
