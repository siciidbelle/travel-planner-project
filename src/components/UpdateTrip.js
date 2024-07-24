// src/components/UpdateTrip.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UpdateTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({ destination: '', date: '', description: '' });

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, 'trips', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        navigate('/');
      }
    };

    fetchTrip();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'trips', id);
    await updateDoc(docRef, trip);
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
