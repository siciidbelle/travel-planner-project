// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Travel Planner</Link>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/add-trip" className="mr-4">Add Trip</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/signup" className="mr-4">Signup</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-lg">Logout</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
