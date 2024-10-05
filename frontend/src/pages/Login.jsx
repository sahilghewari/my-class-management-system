import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Check if admin
        if (response.data.user.role === 'admin') {
          navigate('/admin'); // Redirect admin to a special dashboard
        } else {
          navigate('/'); // Redirect normal user to home
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred during login. Please try again.');
      } else {
        setError('An error occurred during login. Please try again.');
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
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-purple-500 neon-border max-w-md w-full transform scale-95 opacity-0 animate-fadeInUp">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Talent Engaged Logo" className="h-12 animate-pulse" />
        </div>

        <h2 className="text-3xl text-white font-bold text-center mb-4">
          Welcome Back!
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Log in to continue your journey with Talent Engaged.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 neon-glow"
          >
            Log In
          </button>
     
        <button
            
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:shadow-xl mt-6 hover:scale-105 transform transition-all duration-300 neon-glow"
          >
            <Link to="/adminlogin">
            ADMIN LogIn
            </Link>
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign Up
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
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
