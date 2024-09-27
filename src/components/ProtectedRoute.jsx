import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role'); // Get user role from local storage

  // If the user is not a teacher, redirect to the home page
  return role === 'teacher' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;