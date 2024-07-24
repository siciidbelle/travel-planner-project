// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import AddTrip from './components/AddTrip';
import TripList from './components/TripList';
import TripDetails from './components/TripDetails';
import UpdateTrip from './components/UpdateTrip';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import { auth } from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <TripList /> : <Navigate to="/login" />} />
            <Route path="/add-trip" element={isAuthenticated ? <AddTrip /> : <Navigate to="/login" />} />
            <Route path="/trip/:id" element={isAuthenticated ? <TripDetails /> : <Navigate to="/login" />} />
            <Route path="/update-trip/:id" element={isAuthenticated ? <UpdateTrip /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
