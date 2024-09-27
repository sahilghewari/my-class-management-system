import React, { useState } from 'react';
import topper1 from '../assets/images/student1.jpg';
import topper2 from '../assets/images/student2.jpg';
import topper3 from '../assets/images/student3.jpg';
import Footer from './Footer';
import NavigationBar from './NavigationBar';


const courses = [
  {
    name: "Quantum Computing & AI Engineering",
    description: "Master the algorithms that power AI and interstellar data systems. This course covers quantum algorithms, machine learning.",
    teacher: "Dr. Elara Starfall",
    image: topper1,
  },
  {
    name: "Astro-Physics & Galactic Exploration",
    description: "Navigate the cosmos and understand the mysteries of the universe. Dive deep into astrophysics, celestial mechanics, and the technology behind space exploration.",
    teacher: "Prof. Orion Nebula",
    image: topper2,
  },
  {
    name: "Cybernetics & Bio-Augmentation",
    description: "Explore the integration of biology and technology for human enhancements. Study the ethics and techniques of bio-augmentation, robotics.",
    teacher: "Dr. Vega Cyberspace",
    image: topper3,
  },
  {
    name: "Intergalactic Diplomacy & Governance",
    description: "Prepare for leadership roles across civilizations and star systems. Learn about intergalactic laws, diplomacy, and cultural exchange among different planets.",
    teacher: "Ambassador Lyra Galactic",
    image: topper3,
  },
];

const AdmissionsPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleClose = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      <NavigationBar/>
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Introduction */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 neon-glow text-purple-400">Welcome to Talent Engaged Academy</h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
          Step into the future where the stars are your classroom, and the universe is your playground.
          At Talent Engaged Academy, we offer cutting-edge courses and a transformative learning experience.
        </p>
      </section>
      
      {/* Courses Offered */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 neon-glow text-blue-400">Courses Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 neon-border cursor-pointer"
              onClick={() => handleCourseClick(course)}
            >
              <img src={course.image} alt={course.name} className="w-full h-32 object-cover rounded-t-lg" />
              <h3 className="text-xl font-semibold mb-2 text-purple-300">{course.name}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform transform scale-105">
            <button className="absolute top-2 right-2 text-white" onClick={handleClose}>X</button>
            <h3 className="text-2xl font-semibold mb-2 text-purple-300">{selectedCourse.name}</h3>
            <img src={selectedCourse.image} alt={selectedCourse.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-300">{selectedCourse.description}</p>
            <p className="mt-4 text-green-300">Instructor: {selectedCourse.teacher}</p>
          </div>
        </div>
      )}

      {/* Admission Process */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-8 neon-glow text-green-400">Admission Process</h2>
        <ol className="list-decimal list-inside text-left max-w-2xl mx-auto">
          <li className="mb-4">
            <span className="font-bold text-blue-300">Step 1: Online Application</span> - Fill out the application and submit your credentials.
          </li>
          <li className="mb-4">
            <span className="font-bold text-blue-300">Step 2: Entrance Exam</span> - Take the interstellar exam testing your physics and logic skills.
          </li>
          <li className="mb-4">
            <span className="font-bold text-blue-300">Step 3: Interview</span> - Meet our galactic leaders and demonstrate your passion for learning.
          </li>
          <li className="mb-4">
            <span className="font-bold text-blue-300">Step 4: Orientation</span> - Receive your starship pass and prepare for your cosmic journey.
          </li>
        </ol>
      </section>

      {/* Registration Form */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 neon-glow text-pink-400">Registration Form</h2>
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto neon-border">
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Galactic Name:</label>
            <input
              type="text"
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Star Date of Birth:</label>
            <input
              type="date"
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Contact Beacons:</label>
            <input
              type="text"
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Planet Address"
              required
            />
            <input
              type="tel"
              className="w-full p-4 mt-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Comlink (Phone)"
              required
            />
            <input
              type="email"
              className="w-full p-4 mt-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Sub-Ether Address (Email)"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Intended Course of Study:</label>
            <input
              type="text"
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Astral Purpose (Personal Statement):</label>
            <textarea
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              rows="5"
              placeholder="What drives you to explore the cosmos?"
              required
            />
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md neon-glow hover:scale-105 transition-transform duration-300">
            Submit Application
          </button>
        </form>
      </section>

      {/* Payment Form */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 neon-glow text-yellow-400">Payment Form</h2>
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto neon-border">
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Payment Amount (Intergalactic Credits):</label>
            <input
              type="number"
              className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Payment Method:</label>
            <select className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border" required>
              <option value="">Select method</option>
              <option value="credit">Galactic Credit Card</option>
              <option value="paypal">Galactic PayPal</option>
              <option value="bank">Star Bank Transfer</option>
            </select>
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-md neon-glow hover:scale-105 transition-transform duration-300">
            Proceed to Payment
          </button>
        </form>
      </section>

      {/* Additional Links */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8 neon-glow text-orange-400">Need Assistance?</h2>
        <p className="text-gray-300 mb-4">For further inquiries or assistance with the application process, please contact our support team.</p>
        <button className="py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-md neon-glow hover:scale-105 transition-transform duration-300">
          Contact Support
        </button>
      </section>

      

    </div>
    <Footer/>
    </div>
  );
};

export default AdmissionsPage;
