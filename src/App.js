import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddTrip from './components/AddTrip';
import TripDetails from './components/TripDetails';
import TripList from './components/TripList';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure the correct path
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator while checking authentication state
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Route for Login */}
            <Route path="/login" element={<Login />} />
            {/* Route for Signup */}
            <Route path="/signup" element={<Signup />} />
            {/* Protected routes */}
            {user ? (
              <>
                <Route path="/" element={<ProtectedRoute element={TripList} />} />
                <Route path="/add-trip" element={<ProtectedRoute element={AddTrip} />} />
                <Route path="/trip/:id" element={<ProtectedRoute element={TripDetails} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
