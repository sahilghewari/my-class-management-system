import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookOpen, FaEnvelope, FaQuestionCircle ,FaUser} from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', teacher: '', fees: '' });
  const [newNotification, setNewNotification] = useState({ message: '' });
  const [editCourse, setEditCourse] = useState(null); 
  const [inquiries, setInquiries] = useState([]); 
  const [responseMessage, setResponseMessage] = useState({ email: '', message: '' });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate(); 

  const closeModal = () => {
    setSelectedInquiry(null);
    setResponseMessage({ message: '' });
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/adminlogin');
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, notificationsResponse, inquiriesResponse,usersResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/courses'),
          axios.get('http://localhost:5000/api/notifications'),
          axios.get('http://localhost:5000/api/inquiries'),
          axios.get('http://localhost:5000/api/auth/users'), 
        ]);
        
        setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
        setNotifications(Array.isArray(notificationsResponse.data) ? notificationsResponse.data : []);
        setInquiries(Array.isArray(inquiriesResponse.data) ? inquiriesResponse.data : []);
        setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);      } catch (error) {
        console.error('Error fetching data:', error);
        setCourses([]);
        setNotifications([]);
        setInquiries([]);
        setUsers([]);

      }
    };

    fetchData();
  }, []);

  const addCourse = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/courses', newCourse);
      if (response.data && response.data._id) {
        setCourses((prevCourses) => [...prevCourses, response.data]);
        setNewCourse({ title: '', description: '', teacher: '', fees: '' });
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const updateCourse = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${editCourse._id}`, editCourse);
      if (response.data && response.data._id) {
        setCourses((prevCourses) => prevCourses.map(course => (course._id === editCourse._id ? response.data : course)));
        setEditCourse(null);
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const addNotification = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/notifications', newNotification);
      if (response.data && response.data._id) {
        setNotifications((prevNotifications) => [...prevNotifications, response.data]);
        setNewNotification({ message: '' });
      }
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`);
      setNotifications((prevNotifications) => prevNotifications.filter(notification => notification._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const exportQueriesReport = () => {
    const csvData = inquiries.map(query => ({
      Name: query.name,
      Email: query.email,
      Course: query.courseTitle,
      Message: query.reason
    }));

    const headers = ['Name', 'Email', 'Course', 'Message'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => [row.Name, row.Email, row.Course, row.Message].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'queries_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendEmailResponse = async (inquiryId) => {
    try {
      await axios.post(`http://localhost:5000/api/inquiries/${inquiryId}/send-email`, responseMessage);
      alert('Email sent successfully!');
      setResponseMessage({ email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
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
          <a href="#notification-management" className="flex items-center space-x-2 hover:text-blue-500 neon-glow">
            <FaEnvelope className="text-xl" />
            <span>Notification Management</span>
          </a>
          <a href="#inquiries-management" className="flex items-center space-x-2 hover:text-blue-500 neon-glow">
            <FaQuestionCircle className="text-xl" />
            <span>Inquiries Management</span>
          </a>

          <a href="#user-management" className="flex items-center space-x-2 hover:text-blue-500 neon-glow">
            <FaUser className="text-xl" />
            <span>User Management</span>
          </a>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md w-full">
            Logout
          </button>
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
            />
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
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.description}
                      onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                    />
                    <input
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.teacher}
                      onChange={(e) => setEditCourse({ ...editCourse, teacher: e.target.value })}
                    />
                    <input
                      className="w-full mb-2 p-2 bg-gray-700 text-white"
                      value={editCourse.fees}
                      onChange={(e) => setEditCourse({ ...editCourse, fees: e.target.value })}
                    />
                    <div className="flex justify-between">
                      <button className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition" onClick={updateCourse}>
                        Update Course
                      </button>
                      <button className="bg-red-600 py-2 px-4 rounded hover:bg-red-500 transition" onClick={() => setEditCourse(null)}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-semibold">{course.title}</h4>
                    <p className="text-gray-400">{course.description}</p>
                    <p className="text-gray-400">Teacher: {course.teacher}</p>
                    <p className="text-gray-400">Fees: ${course.fees}</p>
                    <div className="flex justify-between mt-4">
                      <button className="text-blue-500" onClick={() => setEditCourse(course)}>Edit</button>
                      <button className="text-red-500" onClick={() => deleteCourse(course._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notification Management Section */}
        <section id="notification-management" className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 neon-text">Notification Management</h3>

          {/* Add New Notification Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 neon-border">
            <h4 className="text-xl font-bold mb-4">Add New Notification</h4>
            <textarea
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
              placeholder="Notification Message"
              value={newNotification.message}
              onChange={(e) => setNewNotification({ message: e.target.value })}
            />
            <button
              className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 transition"
              onClick={addNotification}
            >
              Add Notification
            </button>
          </div>

          {/* Notifications List */}
          <div className="grid grid-cols-1 gap-6">
            {notifications.map(notification => (
              <div key={notification._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition transform neon-glow">
                <p className="text-gray-400">{notification.message}</p>
                <button className="text-red-500 mt-4" onClick={() => deleteNotification(notification._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* Inquiries Management Section */}
        <section id="inquiries-management">
          <h3 className="text-2xl font-semibold mb-6 neon-text">Inquiries Management</h3>
          <button className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 transition mb-4" onClick={exportQueriesReport}>
            Export Queries Report
          </button>

          {/* Inquiries List */}
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inquiry) => (
              <div key={inquiry._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition transform neon-glow">
                <p><strong>Name:</strong> {inquiry.name}</p>
                <p><strong>Email:</strong> {inquiry.email}</p>
                <p><strong>Course:</strong> {inquiry.courseTitle}</p>
                <p><strong>Message:</strong> {inquiry.reason}</p>
                <button className="text-blue-500 mt-4" onClick={() => setSelectedInquiry(inquiry)}>Respond</button>
              </div>
            ))}
          </div>

          {/* Modal for Responding to Inquiry */}
          {selectedInquiry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4">Respond to Inquiry</h4>
                <textarea
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                  placeholder="Response Message"
                  value={responseMessage.message}
                  onChange={(e) => setResponseMessage({ ...responseMessage, message: e.target.value })}
                />
                <div className="flex justify-between">
                  <button
                    className="bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition"
                    onClick={() => sendEmailResponse(selectedInquiry._id)}
                  >
                    Send Response
                  </button>
                  <button className="bg-red-600 py-2 px-4 rounded hover:bg-red-500 transition" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

         {/* User Management Section */}
         <section id="user-management" className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 neon-text">User Management</h3>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4">Registered Users</h4>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-600">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this user?')) {
                            deleteUser(user._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
