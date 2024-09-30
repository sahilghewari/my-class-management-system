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

const Blog = () => {
  const faculties = [
    {
      name: "Sahil Sir",
      image: "sampleteacher", 
    },
    {
      name: "Pavan Sir",
      image: "", 
    },
    {
      name: "Dikshant Sir",
      image: "", 
    },
  ];

  const stats = [
    {
      value: "35000",
      label: "Happy Students",
    },
    {
      value: "300",
      label: "Expert Faculties",
    },
    {
      value: "60",
      label: "Years of Experience",
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
      <div className="flex justify-center  bg-[#0b0f19] mt-12 mb-24 p-4">
        <div className="w-1/2">
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
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 1"
              className="h-full w-full object-cover neon-border"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover neon-border"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 3"
              className="h-full w-full object-cover neon-border"
            />
          </Carousel>
        </div>
      </div>

      {/* Toppers section with sci-fi design */}
      <h1 className="text-4xl text-white font-bold text-center mb-8">See What Our Toppers Say About Us</h1>
      <div className="flex items-center justify-center mt-5 gap-9 bg-[#151a2c] p-24 neon-box">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-80 bg-[#1f2433] transition-transform hover:scale-105 shadow-neon">
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
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-8 text-white">--- Key Features ---</h1>
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="rounded-xl shadow-lg p-4 h-64 w-60 flex items-center flex-col justify-center bg-gradient-to-r  from-blue-500 to-purple-600 text-white border border-[#14F195] transition-transform duration-300 hover:scale-105 hover:bg-[#333333] hover:border-[#00FFEA] neon-glow"
              >
                <img 
                  className="w-16 h-16 mb-4" 
                  src="https://i.postimg.cc/SxT4J38m/images-removebg-preview.png" 
                  alt="Feature Icon" 
                />
                <h2 className="text-lg font-semibold">CLEAR CONCEPTS</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div ref={statsRef} className="bg-[#1a1f3a] text-[rgb(211,211,211)] py-8 neon-box">
        <div className="max-w-7xl mx-auto flex justify-around">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-4xl font-bold text-[#D3D3D3]">
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
        <h2 className="text-3xl text-white font-bold text-center mb-8">Our Renowned Faculties</h2>
        <div className="flex justify-center space-x-12">
          {faculties.map((faculty, index) => (
            <div key={index} className="text-center">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-40 h-40 mx-auto rounded-full object-cover neon-glow"
              />
              <h3 className="mt-4 text-xl font-semibold text-cyan-300">{faculty.name}</h3>
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
