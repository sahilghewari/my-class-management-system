import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Ai from './pages/Ai';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admission from './pages/Admission';
import Admin from './pages/Admin';
import AdminLogin from './pages/Adminlogin';


function App() {
  return (
    <Router>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ai-page" element={<Ai />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

      
      </Routes>
    </Router>
  );
}

export default App;
