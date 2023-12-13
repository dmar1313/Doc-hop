
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus, FaRoad, FaCar } from 'react-icons/fa';
import './Navigation.css';
const Navigation = ({ onAddDriver, onAddTrip, onAddVehicle }) => {
    return (
        <nav className="nav">
            <NavLink to="/" activeClassName="active" >Dashboard</NavLink>
            {/* Button to Add Driver */}
            <button onClick={onAddDriver} title="Add Driver">
                <FaUserPlus />
            </button>
            {/* Button to Add Trip */}
            <button onClick={onAddTrip} title="Add Trip">
                <FaRoad />
            </button>
            {/* Button to Add Vehicle */}
            <button onClick={onAddVehicle} title="Add Vehicle">
                <FaCar />
            </button>
            {/* ... other existing navigation items ... */}
        </nav>
    );
};
export default Navigation;