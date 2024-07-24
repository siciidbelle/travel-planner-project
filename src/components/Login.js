import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // Initial state for the login form
  const initialCredentials = { username: '', password: '' };
  const [credentials, setCredentials] = useState(initialCredentials);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration purposes, we'll consider any non-empty username and password as valid
    if (credentials.username && credentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      // Reset form fields
      setCredentials(initialCredentials);
      // Navigate to the trip list
      navigate('/');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
