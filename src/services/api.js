const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:4000/api'
    : 'https://prime-cinema-backend.onrender.com/api';

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
