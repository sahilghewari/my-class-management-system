import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [classDetails, setClassDetails] = useState({
    title: '',
    date: '',
    time: '',
  });

  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState('');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [notifications, setNotifications] = useState([
    { message: 'New student joined your class.', date: '2024-09-25' },
    { message: 'Assignment submission deadline is today.', date: '2024-09-24' },
  ]);

  const handleClassSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/classes/schedule', classDetails);
      console.log(response)
      alert('Class scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling class:', error);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', { link: newVideo }); // Updated URL
      setVideos((prevVideos) => [...prevVideos, newVideo]);
      setNewVideo('');
      alert('Video added successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/profile/update', profile); // Ensure this URL is correct
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile') 
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching profile:', error));

    axios.get('http://localhost:5000/api/videos') 
      .then((response) => {
        const videoData = Array.isArray(response.data) ? response.data : [];
        setVideos(videoData);
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center neon-glow">Teacher Dashboard</h1>

      {/* Class Scheduling Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 w-full max-w-2xl shadow-lg hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl mb-4">Schedule a Class</h2>
        <form onSubmit={handleClassSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Class Title:</label>
            <input
              type="text"
              value={classDetails.title}
              onChange={(e) => setClassDetails({ ...classDetails, title: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Class Date:</label>
            <input
              type="date"
              value={classDetails.date}
              onChange={(e) => setClassDetails({ ...classDetails, date: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Class Time:</label>
            <input
              type="time"
              value={classDetails.time}
              onChange={(e) => setClassDetails({ ...classDetails, time: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-transform neon-glow">
            Schedule Class
          </button>
        </form>
      </div>

      {/* Video Management Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 w-full max-w-2xl shadow-lg hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl mb-4">Manage Videos</h2>
        <form onSubmit={handleVideoSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Add Video Link:</label>
            <input
              type="url"
              value={newVideo}
              onChange={(e) => setNewVideo(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button className="w-full py-3 rounded-md bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold hover:scale-105 transition-transform neon-glow">
            Add Video
          </button>
        </form>
        <h3 className="text-xl mt-6 mb-4">Uploaded Videos:</h3>
        <ul className="list-disc pl-5">
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video, index) => (
              <li key={index}>
                <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-purple-400 transition-colors">
                  {video.link}
                </a>
              </li>
            ))
          ) : (
            <li>No videos available</li>
          )}
        </ul>
      </div>

      {/* Profile Management Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 w-full max-w-2xl shadow-lg hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl mb-4">Profile</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Bio:</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>
          <button className="w-full py-3 rounded-md bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:scale-105 transition-transform neon-glow">
            Update Profile
          </button>
        </form>
      </div>

      {/* Notifications Section */}
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow-lg hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl mb-4">Notifications</h2>
        <ul className="list-disc pl-5">
          {notifications.map((notification, index) => (
            <li key={index} className="text-gray-400">{notification.message} - <span className="text-gray-600">{notification.date}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
