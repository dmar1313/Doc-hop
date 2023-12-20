import React, { Suspense }  from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading elements
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import DriverListPage from '../pages/DriverListPage';
import VehicleListPage from '../pages/VehicleListPage';
 // Create this element

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/drivers" element={<DriverListPage/>} />
        <Route path="/vehicles" element={<VehicleListPage/>} />
        {/* Add other routes as needed */}
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
