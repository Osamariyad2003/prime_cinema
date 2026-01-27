import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showtimes from './components/Showtimes';
import MovieGrid from './components/MovieGrid';
import CinemaLocations from './components/CinemaLocations';
import QuickBooking from './components/QuickBooking';
import LoyaltySection from './components/LoyaltySection';
import HomeInfo from './components/HomeInfo';
import EventsExperiences from './components/EventsExperiences';
import CinematicGallery from './components/CinematicGallery';
import HomeShowtimes from './components/HomeShowtimes';
import MovieCarousel from './components/MovieCarousel';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import { fetchMovies } from './services/api';

const Home = () => {
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  React.useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  const nowShowing = movies.filter(m => m.isReleased);
  const comingSoon = movies.filter(m => !m.isReleased);

  return (
    <>
      <Hero />
      {/* <QuickBooking /> */}

      <MovieCarousel
        title="NOW SHOWING"
        movies={nowShowing}
        onMovieClick={setSelectedMovie}
        id="now-showing"
      />

      <MovieCarousel
        title="COMING SOON"
        movies={comingSoon}
        onMovieClick={setSelectedMovie}
      />

      {/* <HomeShowtimes /> */}
      {/* <MovieGrid /> Removed in favor of Carousels */}

      {/* <EventsExperiences />
      <CinematicGallery />
      <LoyaltySection />
      <CinemaLocations />
      <HomeInfo /> */}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  console.log('App with Home Rendering');
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />

        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieGrid />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/locations" element={<CinemaLocations />} />
            <Route path="/club" element={<LoyaltySection />} />
            <Route path="/events" element={<EventsExperiences />} />
            <Route path="/contact" element={<HomeInfo />} />
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
