import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';

function TripList() {
  // State to hold the list of trips
  const [trips, setTrips] = useState([]);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    // Set up real-time listener for trips collection
    const unsubscribe = onSnapshot(collection(db, 'trips'), (snapshot) => {
      // Map snapshot documents to trip data
      const tripsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Update state with fetched trip data
      setTrips(tripsData);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Handler for logout
  const handleLogout = () => {
    // Remove authentication status from local storage
    localStorage.removeItem('isAuthenticated');
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Trip List</h2>
      <div className="flex justify-between mb-4">
        {/* Link to the add trip page */}
        <Link to="/add-trip" className="bg-green-500 text-white p-2 rounded-lg">Add Trip</Link>
        {/* Button to log out */}
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-lg">Logout</button>
      </div>
      <ul className="space-y-4">
        {/* Render a list of trips */}
        {trips.map((trip) => (
          <li key={trip.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            {/* Link to view trip details */}
            <Link to={`/trip/${trip.id}`} className="text-blue-500">{trip.destination}</Link>
            {/* Link to edit the trip */}
            <Link to={`/update-trip/${trip.id}`} className="bg-yellow-500 text-white p-2 rounded-lg">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripList;
