import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTrip() {
  // Initial state for the trip form
  const initialTripState = { destination: '', date: '', description: '' };
  const [trip, setTrip] = useState(initialTripState);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve trips from local storage
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    // Add new trip to the list
    trips.push(trip);
    // Save updated trips to local storage
    localStorage.setItem('trips', JSON.stringify(trips));
    // Reset form fields
    setTrip(initialTripState);
    // Navigate back to trip list
    navigate('/');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="destination"
          value={trip.destination}
          placeholder="Destination"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={trip.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="description"
          value={trip.description}
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Add Trip
        </button>
      </form>
    </div>
  );
}

export default AddTrip;
