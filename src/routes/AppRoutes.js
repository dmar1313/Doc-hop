import React, { Suspense }  from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading components
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
 // Create this component

const isAuthenticated = () => {
  // Replace with your actual authentication logic
  return true; // or false based on the user's auth status
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add other routes as needed */}
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
