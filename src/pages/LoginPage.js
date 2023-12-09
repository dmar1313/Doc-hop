import React, { useState } from 'react';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
  };
  
const loginUser = async (credentials) => {
    // Example API call using fetch. Replace with your actual API call logic.
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return data; // The data should include { success: boolean, message: string }
};

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(credentials); // Replace with your API call
            setLoading(false);
            if (response.success) {
                setMessage('Login successful');
                // Redirect or update UI post-login
            } else {
                setMessage(response.message || 'Login failed');
            }
        } catch (error) {
            setLoading(false);
            setMessage('An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            {/* Login form */}
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <input type="email" name="email" value={credentials.email} onChange={handleChange} />
                {/* Password input */}
                <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                {/* Loading and messages */}
                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}
                <button type="submit" disabled={loading}>Sign In</button>
            </form>
        </div>
    );
};

export default LoginPage;
