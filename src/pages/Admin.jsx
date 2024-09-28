import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaUserCog, FaBookOpen, FaCalendarAlt, FaEnvelope, FaDollarSign, FaCogs, FaTrash, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', teacher: '', fees: '' });
  const [editCourse, setEditCourse] = useState(null); // For editing a course

  // Fetch Courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setCourses([]);
          console.error('Courses data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // Add a new course
  const addCourse = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/courses', newCourse);
      if (response.data && response.data._id) {
        setCourses([...courses, response.data]);
        setNewCourse({ title: '', description: '', teacher: '', fees: '' }); // Clear form
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Update course
  const updateCourse = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${editCourse._id}`, editCourse);
      if (response.data && response.data._id) {
        setCourses(courses.map(course => (course._id === editCourse._id ? response.data : course)));
        setEditCourse(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // Delete course
  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 h-full fixed top-0 left-0 p-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 neon-text">Admin Dashboard</h2>
        <nav className="space-y-4">
          <a href="#course-management" className="flex items-center space-x-2 hover:text-blue-500 neon-glow">
            <FaBookOpen className="text-xl" />
            <span>Course Management</span>
          </a>
          <a href="#user-management" className="flex items-center space-x-2 hover:text-blue-500 neon-glow">
            <FaUserCog className="text-xl" />
            <span>User Management</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-10">
        {/* Course Management Section */}
        <section id="course-management" className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 neon-text">Course Management</h3>

          {/* Add New Course Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 neon-border">
            <h4 className="text-xl font-bold mb-4">Add New Course</h4>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />
            <textarea
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            ></textarea>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              placeholder="Teacher Name"
              value={newCourse.teacher}
              onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              placeholder="Course Fees"
              value={newCourse.fees}
              onChange={(e) => setNewCourse({ ...newCourse, fees: e.target.value })}
            />
            <button
              className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 transition"
              onClick={addCourse}
            >
              Add Course
            </button>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition transform neon-glow">
                {editCourse && editCourse._id === course._id ? (
                  <>
                    <input
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.title}
                      onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                    />
                    <textarea
                      className="w-full p-2 mb-2 bg-gray-700 text-white"
                      value={editCourse.description}
                      onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                    ></textarea>
                    <input
                      type="text"
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.teacher}
                      onChange={(e) => setEditCourse({ ...editCourse, teacher: e.target.value })}
                    />
                    <input
                      type="number"
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.fees}
                      onChange={(e) => setEditCourse({ ...editCourse, fees: e.target.value })}
                    />
                    <button
                      className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 mr-2"
                      onClick={updateCourse}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-600 py-2 px-4 rounded hover:bg-gray-500"
                      onClick={() => setEditCourse(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                    <p className="text-gray-400 mb-4">{course.description}</p>
                    <p className="text-gray-400 mb-4">Teacher: {course.teacher}</p>
                    <p className="text-gray-400 mb-4">Fees: ${course.fees}</p>
                    <button
                      className="bg-yellow-600 py-2 px-4 rounded hover:bg-yellow-500 mr-2"
                      onClick={() => setEditCourse(course)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="bg-red-600 py-2 px-4 rounded hover:bg-red-500"
                      onClick={() => deleteCourse(course._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* User Management Section */}
        {/* Add similar implementation for User Management as needed */}
      </main>
    </div>
  );
};

export default AdminDashboard;
