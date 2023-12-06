// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;

