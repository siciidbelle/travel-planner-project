import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TripList() {
  // State to hold the list of trips
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // Load trips from local storage on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      let trips = JSON.parse(localStorage.getItem('trips')) || [];
      setTrips(trips);
    }
  }, [navigate]);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Trip List</h2>
      <div className="flex justify-between mb-4">
        <Link to="/add-trip" className="bg-green-500 text-white p-2 rounded-lg">Add Trip</Link>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-lg">Logout</button>
      </div>
      <ul className="space-y-4">
        {trips.map((trip, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            <Link to={`/trip/${index}`} className="text-blue-500">{trip.destination}</Link>
            <Link to={`/update-trip/${index}`} className="bg-yellow-500 text-white p-2 rounded-lg">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripList;
