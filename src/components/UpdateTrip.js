import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Retrieve trips from local storage
  const trips = JSON.parse(localStorage.getItem('trips')) || [];
  // State to hold the current trip details
  const [trip, setTrip] = useState({ destination: '', date: '', description: '' });

  // Load the current trip details on component mount
  useEffect(() => {
    if (trips[id]) {
      setTrip(trips[id]);
    } else {
      navigate('/');
    }
  }, [id, trips, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the trip in the list
    trips[id] = trip;
    // Save updated trips to local storage
    localStorage.setItem('trips', JSON.stringify(trips));
    // Navigate back to trip list
    navigate('/');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Trip</h2>
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
          Update Trip
        </button>
      </form>
    </div>
  );
}

export default UpdateTrip;
