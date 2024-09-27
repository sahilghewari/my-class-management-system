import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

// Import your images
import logo from '../assets/images/logo.svg';
import heroImage from '../assets/images/hero.jpg';
import feature1 from '../assets/images/feature1.jpg'; 
import feature2 from '../assets/images/feature2.jpg'; 
import feature3 from '../assets/images/feature3.jpg'; 

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0); 

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

      {/* Sci-Fi Futuristic AI Button */}
      <section className="px-8 py-1 flex justify-center">
        <Link to="/ai-page">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-purple-600/50 hover:scale-110 transition-transform neon-glow">
            <span className="tracking-wider uppercase">Explore AI Assistant</span>
          </button>
        </Link>
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

      {/* Call to Action */}
      

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
