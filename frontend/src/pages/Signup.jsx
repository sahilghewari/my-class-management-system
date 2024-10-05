import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (!formData.password) {
      setError("Password can't be blank");
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      setError("Password must contain at least one number, one special character, and be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        navigate('/');
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 20s ease infinite',
      }}
    >
      {/* Container with neon effects and refined borders */}
      <div className="bg-gray-900 p-6 sm:p-10 rounded-lg shadow-lg border-2 border-cyan-400 neon-border max-w-xs sm:max-w-lg w-full transform scale-95 opacity-0 animate-fadeInUp">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Talent Engaged Logo" className="h-14 animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl text-white font-semibold text-center mb-6">
          Join Talent Engaged
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Create an account and start your journey with us.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Animated Input Fields */}
          <div className="mb-5 relative">
            <label className="block text-gray-300 mb-2" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transform transition-transform duration-300 hover:scale-105"
              placeholder="Your Full Name"
              required
            />
          </div>

          <div className="mb-5 relative">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transform transition-transform duration-300 hover:scale-105"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-5 relative">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transform transition-transform duration-300 hover:scale-105"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-5 relative">
            <label className="block text-gray-300 mb-2" htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transform transition-transform duration-300 hover:scale-105"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 neon-glow"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

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
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5);
        }

        .neon-glow {
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Signup;
