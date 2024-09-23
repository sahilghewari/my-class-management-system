import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <div className="flex items-center">
          <img src={logo} alt="Talent Engaged Logo" className="h-10" />
          <span className="text-xl font-bold ml-2">Talent Engaged</span>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600">
            Menu
          </button>
          <button className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600">
            Admissions
          </button>
           <Link to="/blog">
            <button className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600">
              Blog
            </button>
          </Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
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

      {/* Features Section */}
      <section className="px-8 py-16">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-${index === currentFeature ? 'purple-700' : 'gray-800'} p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer ${index === currentFeature ? 'scale-105' : ''} w-full md:w-1/3`}
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
      <section className="px-8 py-16 bg-gray-800 rounded-lg">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6">Join our vibrant community of learners and educators.</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500">
          Get Started
        </button>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Home;
