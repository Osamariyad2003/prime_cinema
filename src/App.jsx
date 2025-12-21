import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showtimes from './components/Showtimes';

import MovieGrid from './components/MovieGrid';
import CinemaLocations from './components/CinemaLocations';
import QuickBooking from './components/QuickBooking';
import LoyaltySection from './components/LoyaltySection';
import Footer from './components/Footer';
import HomeInfo from './components/HomeInfo';
import EventsExperiences from './components/EventsExperiences';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';

const Home = () => (
  <>
    <Hero />
    <QuickBooking />
    <MovieGrid />
    <EventsExperiences />
    <LoyaltySection />
    <CinemaLocations />
    <HomeInfo />
  </>
);

const MoviesPage = () => (
  <div style={{ paddingTop: '40px' }}>
    <MovieGrid />
  </div>
);

const LocationsPage = () => (
  <div style={{ paddingTop: '40px' }}>
    <CinemaLocations />
  </div>
);

const LoyaltyPage = () => (
  <div style={{ paddingTop: '40px' }}>
    <LoyaltySection />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

// Placeholder placeholders for pages not yet fully implemented
const ExperiencesPage = () => <EventsExperiences />;
const EventsPage = () => <EventsExperiences />;
const ContactPage = () => <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}><h2>Contact Us</h2></div>;

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />

        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/club" element={<LoyaltyPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
