import React from 'react';
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


const Blog = () => {

  const faculties = [
    {
      name: "Sahil Sir imgs tak ithe",
      image: "sampleteacher", //sahil imgs tak
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
      value: "35k+",
      label: "Happy Students",
    },
    {
      value: "30+",
      label: "Expert Faculties",
    },
    {
      value: "10+",
      label: "Years of Experience",
    },
  ];

  
// function CarouselCustomNavigation() {
  return (
    <div className='bg-[#212121]' >
      {/* Navbar */}

    <NavigationBar/>
 

    <div className="flex justify-center bg-[#212121] mt-12 mb-24 p-4">
    <div className="w-1/2">
        <Carousel
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
            />
        </Carousel>
    </div>
</div>
<div>
  <h1 className='text-3xl text-white font-bold text-center mb-8 '>See what our Toppers Talk About Us</h1>
<div className='flex items-center justify-center mt-5 gap-9 bg-[#302c2c] p-24'>
    <Card className="mt-6 w-96 bg-[#595757]">
        <CardHeader className="relative h-56">
            <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
            />
        </CardHeader>
        <CardBody>
            <h2 variant="h5" className="mb-2 text-white">
                UI/UX Review Check
            </h2>
            <h3 className='text-white'>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona.
            </h3>
        </CardBody>
        <CardFooter className="pt-0">
            <Button>Read More</Button>
        </CardFooter>
    </Card>
    <Card className="mt-6 w-96 bg-[#595757]">
        <CardHeader className="relative h-56">
            <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
            />
        </CardHeader>
        <CardBody>
            <h2 variant="h5" className="mb-2 text-white">
                UI/UX Review Check
            </h2>
            <h3 className='text-white'>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona.
            </h3>
        </CardBody>
        <CardFooter className="pt-0">
            <Button>Read More</Button>
        </CardFooter>
    </Card> 
    <Card className="mt-6 w-96 bg-[#595757]">
        <CardHeader className="relative h-56">
            <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
            />
        </CardHeader>
        <CardBody>
            <h2 variant="h5" className="mb-2 text-white">
                UI/UX Review Check
            </h2>
            <h3 className='text-white'>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona.
            </h3>
        </CardBody>
        <CardFooter className="pt-0">
            <Button>Read More</Button>
        </CardFooter>
    </Card>
    
</div>
  </div>

<div className="container mx-auto p-8">
    <div className="text-center">
        <h1 className="text-2xl font-bold mb-8 text-white">--- Key Features ---</h1>
        <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-xl shadow-lg p-4 h-64 w-60 flex items-center flex-col justify-center bg-[#595757]">
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

<div className="bg-[#302c2c] text-white py-8">
      <div className="max-w-7xl mx-auto flex justify-around">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h2 className="text-4xl font-bold">{stat.value}</h2>
            <p className="mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

<div className="bg-[#212121] py-16">
      <h2 className="text-3xl text-white font-bold text-center mb-8">Our Renowned Faculties</h2>
      <div className="flex justify-center space-x-12">
        {faculties.map((faculty, index) => (
          <div key={index} className="text-center">
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-40 h-40 mx-auto  object-cover"
            />
            <h3 className="mt-4 text-xl font-semibold">{faculty.name}</h3>
          </div>
        ))}
      </div>
    </div>


      {/* Footer */}
      <Footer/>
    </div>
  );
}
// };

export default Blog;
