
// Configurable via VITE_API_BASE_URL so different environments (local backend, staging,
// production) don't require editing source. Falls back to the deployed backend for convenience.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://prime-cinema-backend-1.onrender.com/api';

// Foods Bar API
export const fetchFoods = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/food`);
        if (!response.ok) throw new Error('Failed to fetch foods');
        return await response.json();
    } catch (error) {
        console.error('Error fetching foods:', error);
        return [];
    }
};

// Sports Events API
export const fetchSportsEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies?category=sport`);
        if (!response.ok) throw new Error('Failed to fetch sports events');
        return await response.json();
    } catch (error) {
        console.error('Error fetching sports events:', error);
        return [];
    }
};

export const fetchMovies = async (date) => {
    try {
        let url = `${API_BASE_URL}/movies`;
        if (date) {
            url += `?date=${new Date(date).toISOString()}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch movies');
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

export const fetchMovieById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

// Real per-seat availability for a specific showtime (seat.id is the real inventory ID the
// backend expects on POST /bookings — do NOT use the mock-generated row/col labels for this).
export const fetchShowtimeSeats = async (showtimeId) => {
    const response = await fetch(`${API_BASE_URL}/showtimes/${showtimeId}/seats`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch seat availability');
    return data;
};

export const fetchCinemas = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cinemas`);
        if (!response.ok) throw new Error('Failed to fetch cinemas');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cinemas:', error);
        return [];
    }
};

// Auth Services
export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
};

export const register = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    return data;
};

export const fetchProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
    return data;
};

export const fetchMyBookings = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/my-bookings`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch bookings');
    return data;
};

// Backend contract (verified against the live API): one booking = one seat.
// Body: { showtimeId, seatId, guestEmail? }. Response: { booking, clientSecret } — clientSecret
// is a Stripe PaymentIntent client secret that must then be confirmed client-side with
// stripe.confirmCardPayment(); creating the booking is what actually reserves the seat, before
// any card is charged.
export const createBooking = async (bookingData, token) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(bookingData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create booking');
    return data;
};

export const fetchShowtimes = async (date) => {
    const movies = await fetchMovies(date);
    return movies.reduce((acc, movie) => {
        if (!movie.showtimes) return acc;
        const movieSessions = movie.showtimes.map(st => ({
            ...st,
            movieTitle: movie.title,
            moviePoster: movie.posterUrl,
            cinemaName: st.screen?.cinema?.cinemaName || 'Cinema',
            screenName: st.screen?.screenName || 'Standard'
        }));
        return [...acc, ...movieSessions];
    }, []).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
};
