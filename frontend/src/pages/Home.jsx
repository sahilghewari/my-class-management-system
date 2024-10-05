import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import axios from 'axios';

import heroImage from '../assets/images/hero.jpg';
import feature1 from '../assets/images/feature1.jpg'; 
import feature2 from '../assets/images/feature2.jpg'; 
import feature3 from '../assets/images/feature3.jpg'; 

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0); 
  const [notifications, setNotifications] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    setIsAuthenticated(!!token);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const features = [
    { 
      title: 'Explore All Benefits of Talent Engaged',
      description: 'Seamless communication between teachers, students, & parents.',
      image: feature1,
      tags: ['Real-time Class', 'Multimedia', 'Interactive'],
    },
    { 
      title: 'Join Our Community',
      description: 'Become a part of our vibrant learning environment.', 
      image: feature2,
      tags: ['Community'], 
    },
    {
      title: 'Embrace the Future of Education',
      description: 'Our platform allows you to connect, collaborate, & thrive.',
      image: feature3,
      tags: ['Opportunities'],
    },
  ];

 
  const handleAIButtonClick = () => {
    if (isAuthenticated) {
      navigate('/ai-page');
    } else {
      alert("Please login To use AI")
      navigate('/login'); 
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 
            bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent 
            transition-transform transform hover:scale-105 relative"
            style={{ 
              textShadow: 
                '2px 2px 2px rgba(255, 255, 255, 0.6), 3px 3px 5px rgba(173, 216, 230, 0.7), 4px 4px 10px rgba(135, 206, 250, 0.7), 0 0 15px rgba(70, 130, 180, 0.6)' 
            }}>
            Transforming Education with Talent Engaged
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Welcome to Talent Engaged: your innovative online classroom platform.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={heroImage}
            alt="Student smiling"
            className="rounded-lg shadow-lg transition-transform transform hover:scale-105" 
          />
        </div>
      </section>

      {/*  AI Button */}
      <section className="px-8 py-1 flex justify-center">
        <button 
          onClick={handleAIButtonClick} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-purple-600/50 hover:scale-110 transition-transform neon-glow"
        >
          <span className="tracking-wider uppercase">Explore AI Assistant</span>
        </button>
      </section>
     
      {/* Notifications Section */}
      <section className="relative px-8 py-16 overflow-hidden">
  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent neon-glow text-center">
    Latest News
  </h2>
  
  {/* Animated Background */}
  <div className="absolute inset-0 bg-[url('/path-to-your-animation.gif')] bg-cover bg-center opacity-20" />

  {/* 3D Sci-Fi Card */}
  <div className="relative z-10 bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-purple-500 neon-border transition-transform transform hover:scale-105 backdrop-blur-lg">
    <div className="flex flex-col space-y-4">
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div
            key={notification.id}
            className="flex justify-between items-center bg-gray-800 bg-opacity-70 rounded-lg p-4 shadow-lg transform transition-transform hover:scale-105"
          >
            <p className="text-sm text-gray-200">{notification.message}</p>
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div> {/* Optional indicator bubble */}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-300">No notifications available.</p>
      )}
    </div>
  </div>
  
</section>

      {/* Features Section */}
      <section className="px-8 py-16">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer border-2 border-purple-500 neon-border`}
              onClick={() => setCurrentFeature(index)}
            >
              {index === currentFeature && (
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
              <p className="mb-4 text-sm">{feature.description}</p>
              <div className="flex flex-wrap">
                {feature.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="bg-purple-500 text-white px-2 py-1 rounded-md text-xs mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
