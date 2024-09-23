import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaUsers, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import topper1 from '../assets/images/student1.jpg';
import topper2 from '../assets/images/student2.jpg';
import topper3 from '../assets/images/student3.jpg';

import class1 from '../assets/images/classsroom1.jpg';
import class2 from '../assets/images/classsroom2.jpg';
import class3 from '../assets/images/classsroom3.jpg';

const Blog = () => {
  const topStudents = [
    {
      name: 'John Doe',
      achievement: 'Top scorer in the Science Olympiad',
      image: topper1, 
    },
    {
      name: 'Jane Smith',
      achievement: 'Awarded Best Student in Mathematics',
      image: topper2, 
    },
    {
      name: 'Emily Johnson',
      achievement: 'Achieved a 95% in board exams',
      image: topper3, 
    },
  ];
  const classrooms = [
    { image: class1, alt: 'Classroom 1' },
    { image: class2, alt: 'Classroom 2' },
    { image: class3, alt: 'Classroom 3' },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <div className="flex items-center">
          <img src="/assets/images/logo.svg" alt="Talent Engaged Logo" className="h-10" />
          <span className="text-xl font-bold ml-2">Talent Engaged</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/admissions" className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600 transition duration-300">Admissions</Link>
          <Link to="/blog" className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600 transition duration-300">Blog</Link>
          <Link to="/login" className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600 transition duration-300">Login</Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition duration-300">Get Started</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16 fade-in">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg mb-6">Stay updated with our latest news and achievements at Talent Engaged.</p>
      </section>

      {/* Topper Students Section */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-bold mb-6">Topper Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topStudents.map((student, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl duration-300">
              <img src={student.image} alt={student.name} className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <p>{student.achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Classes Information Section */}
      <section className="px-8 py-16 bg-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center fade-in">About Our Classes</h2>
      <p className="text-lg mb-6 text-center fade-in">At Talent Engaged, we offer a variety of classes designed to meet the needs of students at all levels. Our experienced instructors use innovative teaching methods to ensure each student achieves their full potential.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl duration-300 fade-in">
          <div className="flex items-center mb-4">
            <FaUsers className="text-purple-500 text-4xl mr-2" />
            <h3 className="text-xl font-semibold">Small Class Sizes</h3>
          </div>
          <p>We maintain small class sizes to ensure personalized attention for every student, fostering a conducive learning environment.</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl duration-300 fade-in">
          <div className="flex items-center mb-4">
            <FaChalkboardTeacher className="text-purple-500 text-4xl mr-2" />
            <h3 className="text-xl font-semibold">Experienced Instructors</h3>
          </div>
          <p>Our instructors are highly qualified and experienced, using innovative teaching methods to engage students effectively.</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl duration-300 fade-in">
          <div className="flex items-center mb-4">
            <FaGraduationCap className="text-purple-500 text-4xl mr-2" />
            <h3 className="text-xl font-semibold">Comprehensive Curriculum</h3>
          </div>
          <p>We offer a comprehensive curriculum that adapts to the needs of each student, ensuring they are well-prepared for their future.</p>
        </div>
      </div>
      
      <ul className="list-disc list-inside mt-8 fade-in">
        <li>Interactive learning with multimedia resources.</li>
        <li>Regular assessments to track progress.</li>
        <li>Supportive community and resources for all students.</li>
      </ul>
    </section>

     {/* Classes Photos Section */}
<section className="px-8 py-16">
  <h2 className="text-3xl font-bold mb-6">Classroom Moments</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {classrooms.map((classroom, index) => (
      <div key={index} className="overflow-hidden rounded-md transition-transform transform hover:scale-105">
        <img 
          src={classroom.image} 
          alt={classroom.alt} 
          className="w-full h-48 object-cover"
        />
      </div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <section className="px-8 py-16 bg-gray-800 rounded-lg">
        <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
        <p className="text-lg mb-6">Become part of our thriving educational community.</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition duration-300">
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
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-lg mr-4 mb-2 hover:text-purple-500 transition duration-300">
              <FaFacebook className="inline-block mr-1" /> Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-lg mr-4 mb-2 hover:text-purple-500 transition duration-300">
              <FaTwitter className="inline-block mr-1" /> Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-lg mr-4 mb-2 hover:text-purple-500 transition duration-300">
              <FaInstagram className="inline-block mr-1" /> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
