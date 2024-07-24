import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTrip from './components/AddTrip';
import TripList from './components/TripList';
import TripDetails from './components/TripDetails';
import UpdateTrip from './components/UpdateTrip';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/update-trip/:id" element={<UpdateTrip />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
