// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optional: display a loading spinner or similar
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <ProtectedRoute element={TripList} isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-trip"
              element={
                isAuthenticated ? (
                  <ProtectedRoute element={AddTrip} isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/trip/:id"
              element={
                isAuthenticated ? (
                  <ProtectedRoute element={TripDetails} isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/update-trip/:id"
              element={
                isAuthenticated ? (
                  <ProtectedRoute element={UpdateTrip} isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
