import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.svg'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      if (response.status === 200) {
        
        localStorage.setItem('adminToken', response.data.token);

       
        setIsLoggedIn(true);
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/adminlogin'); 
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black"
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 20s ease infinite',
      }}
    >
      {isLoggedIn ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-purple-500 neon-border max-w-md w-full transform scale-95 opacity-0 animate-fadeInUp">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Talent Engaged Logo" className="h-12 animate-pulse" />
          </div>
          <h2 className="text-3xl text-white font-bold text-center mb-4">Admin Dashboard</h2>
          <p className="text-center text-gray-300 mb-6">Welcome, Admin!</p>

          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 neon-glow"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-purple-500 neon-border max-w-md w-full transform scale-95 opacity-0 animate-fadeInUp">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Talent Engaged Logo" className="h-12 animate-pulse" />
          </div>

          <h2 className="text-3xl text-white font-bold text-center mb-4">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 transform transition-transform duration-500 hover:scale-105">
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 neon-glow"
            >
              Login
            </button>
          </form>
        </div>
      )}

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

export default AdminLogin;
