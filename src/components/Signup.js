// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Signup() {
  const initialCredentials = { email: '', password: '' };
  const [credentials, setCredentials] = useState(initialCredentials);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      setCredentials(initialCredentials);
      navigate('/');
    } catch (error) {
      alert('Failed to create an account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Email"
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
