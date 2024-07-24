// src/components/TripDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, 'trips', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchTrip();
  }, [id]);

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
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default TripDetails;
