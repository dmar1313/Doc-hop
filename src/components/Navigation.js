import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isLoggedIn }) => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Dashboard</NavLink></li>
                {isLoggedIn ? (
                    <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
                    // Include other links for logged-in users
                ) : (
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                )}
                {/* More navigation links as needed */}
            </ul>
        </nav>
    );
};

export default Navigation;
