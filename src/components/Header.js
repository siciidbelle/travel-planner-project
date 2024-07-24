import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Travel Planner</Link>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/add-trip">Add Trip</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
