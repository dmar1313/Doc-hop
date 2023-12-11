import React, { useState } from 'react';

const AddUserForm = ({ onClose }) => {
    const [userData, setUserData] = useState({
        // Initialize your user data state here
        // For example: name: '', email: '', etc.
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Here, you would typically make an API call to your backend to add the user
        // For now, let's just log the data and pretend we're sending it
        console.log("Submitting user data:", userData);

        // Simulate API call response
        setLoading(false);
        setMessage('User added successfully');
        setUserData({}); // Reset form after submission
        // onClose(); // Optionally close the form upon successful submission
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Example input fields */}
                <input
                    type="text"
                    name="name"
                    value={userData.name || ''}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email || ''}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                {/* Add other input fields as needed */}

                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}

                <button type="button" onClick={onClose}>Close</button>
                <button type="submit" disabled={loading}>Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;
