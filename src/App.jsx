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
import CinematicGallery from './components/CinematicGallery';
import HomeShowtimes from './components/HomeShowtimes';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';

const Home = () => (
  <>
    <Hero />
    <QuickBooking />
    <HomeShowtimes />
    <MovieGrid />
    <EventsExperiences />
    <CinematicGallery />
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
            {/* Home */}
            <Route path="/prime_cinema" element={<Home />} />

            {/* Movies */}
            <Route path="/prime_cinema/movies" element={<MoviesPage />} />

            {/* Showtimes */}
            <Route path="/prime_cinema/showtimes" element={<Showtimes />} />

            {/* Locations */}
            <Route path="/prime_cinema/locations" element={<LocationsPage />} />

            {/* Loyalty */}
            <Route path="/prime_cinema/club" element={<LoyaltyPage />} />

            {/* Experiences */}
            <Route path="/prime_cinema/experiences" element={<ExperiencesPage />} />

            {/* Events */}
            <Route path="/prime_cinema/events" element={<EventsPage />} />

            {/* Contact */}
            <Route path="/prime_cinema/contact" element={<ContactPage />} />

            {/* Auth */}
            <Route path="/prime_cinema/login" element={<Login />} />

            <Route path="/prime_cinema/register" element={<Register />} />

            {/* Dashboard (protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prime_cinema/dashboard"
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
