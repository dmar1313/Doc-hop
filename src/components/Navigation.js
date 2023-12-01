// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" activeClassName="active">Dashboard</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        {/* More navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
