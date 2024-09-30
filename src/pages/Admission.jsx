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

  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    courseTitle: '',
    phone: '',
    contactTime: '',
    reason: '',
    comments: ''
  });


  
  

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    
    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleClose = () => {
    setSelectedCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

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
      setNewCourse({ title: '', description: '', teacher: '', fees: '' });

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
        
        {/* Introduction */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-extrabold mb-4 text-gray-200">Welcome to Talent Engaged Academy</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Where learning meets innovation. Our courses are designed to take you beyond the ordinary.
          </p>
        </section>

        {/* Courses Offered */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-100">Courses Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                onClick={() => handleCourseClick(course)}
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">{course.title}</h3>
                <p>{course.description}</p>
                <p className="mt-2 text-green-400">Instructor: {course.teacher}</p>
                <p className="mt-2 text-yellow-300">Fees: ${course.fees}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform transform scale-105">
              <button className="absolute top-2 right-2 text-white" onClick={handleClose}>X</button>
              <h3 className="text-2xl font-semibold mb-2 text-blue-300">{selectedCourse.title}</h3>
              <p className="text-gray-300">{selectedCourse.description}</p>
              <p className="mt-4 text-green-300">Instructor: {selectedCourse.teacher}</p>
              <p className="mt-2 text-yellow-300">Fees: ${selectedCourse.fees}</p>
            </div>
          </div>
        )}

          {/* Admission Process */}
          <section className="mb-16 py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white text-center">
          <h2 className="text-6xl font-extrabold mb-12 text-blue-400">
            Admission Process
          </h2>
          
          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8">
            
            {/* Step 1 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 max-w-sm w-full">
              <div className="mb-6">
                <div className="text-blue-300 text-6xl mb-4">1️⃣</div>
                <h3 className="text-3xl font-bold text-blue-300"> Inquiry</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Submit your application online through our  above inquiry <br />form .
              </p>
              <a
                href="/admission"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:scale-105 transition-transform duration-300 text-center"
              >
                Start Application
              </a>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 max-w-sm w-full">
              <div className="mb-6">
                <div className="text-blue-300 text-6xl mb-4">2️⃣</div>
                <h3 className="text-3xl font-bold text-blue-300">Entrance Exam</h3>
              </div>
              <p className="text-gray-300 mb-4">
                After application review, you will receive details for the entrance exam.
              </p>
              <a
                href="/exam-info"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:scale-105 transition-transform duration-300 text-center"
              >
                Learn More
              </a>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 max-w-sm w-full">
              <div className="mb-6">
                <div className="text-blue-300 text-6xl mb-4">3️⃣</div>
                <h3 className="text-3xl font-bold text-blue-300">Interview</h3>
              </div>
              <p className="text-gray-300 mb-4">
                After passing the exam, the next step is an interview with our faculty.
              </p>
              <a
                href="/interview-tips"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:scale-105 transition-transform duration-300 text-center"
              >
                Prepare for Interview
              </a>
            </div>
            
            {/* Step 4 */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 max-w-sm w-full">
              <div className="mb-6">
                <div className="text-blue-300 text-6xl mb-4">4️⃣</div>
                <h3 className="text-3xl font-bold text-blue-300">Orientation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Get introduced to the campus, meet your peers, and start your journey.
              </p>
              <a
                href="/orientation-info"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:scale-105 transition-transform duration-300 text-center"
              >
                Orientation Details
              </a>
            </div>
            
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h3 className="text-4xl font-semibold mb-8 text-gray-100">Frequently Asked Questions</h3>
            <div className="max-w-4xl mx-auto space-y-4">
              
              {/* FAQ 1 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-2xl font-bold text-blue-300">What are the application requirements?</h4>
                <p className="text-gray-300 mt-2">
                  You'll need to submit your academic records, a letter of intent, and recommendation letters.
                </p>
              </div>
              
              {/* FAQ 2 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-2xl font-bold text-blue-300">When will the entrance exam take place?</h4>
                <p className="text-gray-300 mt-2">
                  The exam dates will be announced shortly after we review your application.
                </p>
              </div>
              
              {/* FAQ 3 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-2xl font-bold text-blue-300">What should I prepare for the interview?</h4>
                <p className="text-gray-300 mt-2">
                  Be ready to discuss your academic goals, previous achievements, and future plans.
                </p>
              </div>
              
            </div>
          </div>
        </section>
        <section className="mb-16 max-w-4xl mx-auto">
  <h2 className="text-5xl font-bold mb-8 text-center text-blue-400">Course Inquiry Form</h2>
  <p className="text-lg text-gray-300 text-center mb-12">Please fill out the form below to inquire about a course, and we will get back to you with more information.</p>
  
  <form className="bg-gray-800 p-10 rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
    
    {/* Personal Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-6">
        <label className="block mb-2 text-gray-400">Full Name:</label>
        <input
          type="text"
          name="name"
          value={inquiry.name}
          onChange={handleInputChange}
          className="w-full p-4 rounded-md bg-gray-700 text-white"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-400">Email Address:</label>
        <input
          type="email"
          name="email"
          value={inquiry.email}
          onChange={handleInputChange}
          className="w-full p-4 rounded-md bg-gray-700 text-white"
          placeholder="Enter your email"
          required
        />
      </div>
    </div>
    
    {/* Course Inquiry */}
    <div className="mb-6">
      <label className="block mb-2 text-gray-400">Course Title:</label>
      <input
        type="text"
        name="courseTitle"
        value={inquiry.courseTitle}
        onChange={handleInputChange}
        className="w-full p-4 rounded-md bg-gray-700 text-white"
        placeholder="Enter the course title you're inquiring about"
        required
      />
    </div>

    {/* Phone and Contact Preference */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-6">
        <label className="block mb-2 text-gray-400">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={inquiry.phone}
          onChange={handleInputChange}
          className="w-full p-4 rounded-md bg-gray-700 text-white"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-400">Preferred Contact Time:</label>
        <select
          name="contactTime"
          value={inquiry.contactTime}
          onChange={handleInputChange}
          className="w-full p-4 rounded-md bg-gray-700 text-white"
        >
          <option value="" disabled>Select preferred time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>
    </div>

    {/* Reason for Inquiry */}
    <div className="mb-6">
      <label className="block mb-2 text-gray-400">Reason for Inquiry:</label>
      <textarea
        name="reason"
        value={inquiry.reason}
        onChange={handleInputChange}
        className="w-full p-4 rounded-md bg-gray-700 text-white"
        rows="3"
        placeholder="Describe why you're interested in this course"
        required
      />
    </div>

    {/* Optional Message */}
    <div className="mb-6">
      <label className="block mb-2 text-gray-400">Additional Comments:</label>
      <textarea
        name="comments"
        value={inquiry.comments}
        onChange={handleInputChange}
        className="w-full p-4 rounded-md bg-gray-700 text-white"
        rows="3"
        placeholder="Leave a message (optional)"
      />
    </div>
    
    {/* Submit Button */}
    <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:scale-105 transition-transform duration-300">
      Submit Inquiry
    </button>
  </form>
</section>

        {/* Contact Us */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-100">Need Assistance?</h2>
          <a href="/contact" className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6 text-white rounded-md shadow-lg hover:scale-105 transition-transform duration-300">
            Contact Us
          </a>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AdmissionsPage;
