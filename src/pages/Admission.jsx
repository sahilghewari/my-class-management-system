import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavigationBar from './NavigationBar';

const AdmissionsPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    teacher: '',
    fees: ''
  });

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses'); // Ensure this API endpoint is correctly set up in your backend
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data); // Set the fetched courses into state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    
    fetchCourses(); // Call the fetch function when the component mounts
  }, []);

  // Handle course selection to display the course modal
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  // Close the course modal
  const handleClose = () => {
    setSelectedCourse(null);
  };

  // Handle input changes for the registration form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  // Submit the new course form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });
      if (!response.ok) {
        throw new Error('Failed to submit course');
      }
      setNewCourse({ title: '', description: '', teacher: '', fees: '' }); // Clear the form

      // Refresh the course list after submission
      const updatedCourses = await fetch('/api/courses');
      const data = await updatedCourses.json();
      setCourses(data);
    } catch (error) {
      console.error('Error submitting course:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
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
                <h3 className="text-xl font-semibold mb-2 text-purple-300">{course.title}</h3>
                <p>{course.description}</p>
                <p className="mt-2 text-green-300">Instructor: {course.teacher}</p>
                <p className="mt-2 text-yellow-300">Fees: ${course.fees}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform transform scale-105">
              <button className="absolute top-2 right-2 text-white" onClick={handleClose}>X</button>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">{selectedCourse.title}</h3>
              <p className="text-gray-300">{selectedCourse.description}</p>
              <p className="mt-4 text-green-300">Instructor: {selectedCourse.teacher}</p>
              <p className="mt-2 text-yellow-300">Fees: ${selectedCourse.fees}</p>
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
          <form className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto neon-border" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Course Title:</label>
              <input
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
                className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Course Description:</label>
              <textarea
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
                rows="3"
                placeholder="Enter course description"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Instructor:</label>
              <input
                type="text"
                name="teacher"
                value={newCourse.teacher}
                onChange={handleInputChange}
                className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
                placeholder="Enter instructor name"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Fees:</label>
              <input
                type="number"
                name="fees"
                value={newCourse.fees}
                onChange={handleInputChange}
                className="w-full p-4 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 neon-border"
                placeholder="Enter course fees"
                required
              />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md neon-glow hover:scale-105 transition-transform duration-300">
              Submit Course
            </button>
          </form>
        </section>

        {/* Additional Links */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8 neon-glow text-orange-400">Need Assistance?</h2>
          <p className="text-gray-300 mb-4">For further inquiries, contact our admissions team via the link below:</p>
          <a href="/contact" className="bg-gradient-to-r from-purple-500 to-red-500 py-3 px-6 text-white rounded-md shadow-lg hover:scale-105 transition-transform duration-300">Contact Us</a>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AdmissionsPage;
