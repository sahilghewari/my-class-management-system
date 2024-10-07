import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import { Carousel } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import CountUp from 'react-countup';
import s from '../assets/images/p.jpg'; 
import p from '../assets/images/q.jpg';
import d from '../assets/images/r.jpg';

const Blog = () => {
  const faculties = [
    {
      name: "Dr.Arun Sethi",
      image: d, 
    },
    {
      name: "Dr.Harpreet Singh",
      image: p, 
    },
    {
      name: "Dr.Aadesh bandekar",
      image: s, 
    },
  ];

  const stats = [
    {
      value: "3000",
      label: "Happy Students",
    },
    {
      value: "50",
      label: "Expert Faculties",
    },
    {
      value: "25",
      label: "Years of Experience",
    },
  ];

  const keyFeatures = [
    {
      title: "Clear Concepts",
      description: "In-depth explanations to ensure complete understanding.",
      icon: "https://i.postimg.cc/SxT4J38m/images-removebg-preview.png",
    },
    {
      title: "Expert Guidance",
      description: "Learn from industry-leading professionals with extensive experience.",
      icon: "https://i.postimg.cc/9f91jLYM/icon2.png", 
    },
    {
      title: "Interactive Learning",
      description: "Engaging sessions that promote active participation.",
      icon: "https://i.postimg.cc/4yf1Vsk7/self-learning.png", 
    },
    {
      title: "Flexible Scheduling",
      description: "Choose your own study times to fit your busy lifestyle.",
      icon: "https://i.postimg.cc/c45cgpDC/schedule.png", 
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const handleScroll = () => {
    if (statsRef.current) {
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0b0f19] min-h-screen">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Carousel with sci-fi glow effect */}
      <div className="flex justify-center bg-[#0b0f19] mt-12 mb-24 p-4">
        <div className="w-full lg:w-1/2"> {/* Full width on mobile */}
          <Carousel
            className="rounded-xl neon-glow"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all ${activeIndex === i ? "w-8 bg-cyan-400" : "w-4 bg-cyan-600"}`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <img
              src="https://i.postimg.cc/dDMtgtsD/feliphe-schiarolli-hes6n-UC1-MVc-unsplash.jpg"
              alt="image 1"
              className="h-full w-full object-cover neon-border"
            />
            <img
              src="https://i.postimg.cc/vmPnk9pB/kenny-eliason-z-FSo6bn-ZJTw-unsplash.jpg"
              alt="image 2"
              className="h-full w-full object-cover neon-border"
            />
            <img
              src="https://i.postimg.cc/K8xgYJbj/annie-spratt-Qckxruozj-Rg-unsplash.jpg"
              alt="image 3"
              className="h-full w-full object-cover neon-border"
            />
          </Carousel>
        </div>
      </div>

      {/* Toppers section with sci-fi design */}
      <h1 className="text-2xl lg:text-4xl text-white font-bold text-center mb-8">See What Our Toppers Say About Us</h1>
      <div className="flex flex-wrap justify-center gap-6 lg:gap-9 bg-[#151a2c] p-8 lg:p-24 neon-box">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-full lg:w-80 bg-[#1f2433] transition-transform hover:scale-105 shadow-neon">
            <CardHeader className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2 text-cyan-300">
                UI/UX Review Check
              </Typography>
              <Typography className="text-cyan-100">
                The place is close to Barceloneta Beach and bus stop just 2 min by walk, close to "Naviglio" where you can enjoy the main nightlife in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button className="neon-button">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Key Features section */}
      <div className="container mx-auto p-4 lg:p-8">
        <div className="text-center">
          <h1 className="text-xl lg:text-2xl font-bold mb-8 text-white">--- Key Features ---</h1>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-x-24 gap-y-8 lg:gap-y-12">
            {keyFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="rounded-xl shadow-lg p-4 h-64 w-44 lg:w-60 flex items-center flex-col justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-black border border-[#14F195] transition-transform duration-300 hover:scale-105 hover:bg-[#333333] hover:border-[#00FFEA] neon-glow"
              >
                <img 
                  className="w-12 h-12 lg:w-16 lg:h-16 mb-4" 
                  src={feature.icon} 
                  alt="Feature Icon" 
                />
                <h2 className="text-sm lg:text-lg font-semibold">{feature.title}</h2>
                <p className="text-center mt-2 text-xs lg:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div ref={statsRef} className="bg-[#1a1f3a] text-[rgb(211,211,211)] py-8 neon-box">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around text-center">
          {stats.map((stat, index) => (
            <div key={index} className="w-full lg:w-auto mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#D3D3D3]">
                {isVisible ? (
                  <CountUp start={0} end={parseInt(stat.value.replace(/\D/g, ''))} duration={3} />
                ) : (
                  stat.value 
                )}
              </h2>
              <p className="mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Faculties Section */}
      <div className="bg-[#0b0f19] py-16">
        <h2 className="text-2xl lg:text-3xl text-white font-bold text-center mb-8">Our Renowned Faculties</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {faculties.map((faculty, index) => (
            <div key={index} className="text-center">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-40 lg:w-56 h-40 lg:h-56 object-cover rounded-full shadow-lg border-4 border-cyan-300 transition-transform duration-300 hover:scale-110"
              />
              <p className="mt-4 text-lg lg:text-xl text-cyan-300 font-bold">{faculty.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
