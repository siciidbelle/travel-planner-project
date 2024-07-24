import React from 'react';
import { useParams, Link } from 'react-router-dom';

function TripDetails() {
  const { id } = useParams();
  const trips = JSON.parse(localStorage.getItem('trips')) || [];
  const trip = trips[id];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Trip Details</h2>
      {trip ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">{trip.destination}</h3>
          <p className="mb-2"><span className="font-semibold">Date:</span> {trip.date}</p>
          <p className="mb-4"><span className="font-semibold">Description:</span> {trip.description}</p>
          <Link to="/" className="block text-center bg-blue-500 text-white p-2 rounded-lg">Back to List</Link>
        </div>
      ) : (
        <p className="text-center">Trip not found</p>
      )}
    </div>
  );
}

export default TripDetails;
