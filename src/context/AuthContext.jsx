import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const profileData = await fetchProfile(token);
                    setUser(profileData);
                } catch (error) {
                    console.error('Session expired:', error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const loginUser = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Kept alongside AuthProvider deliberately; splitting into a separate file would require
// updating ~15 import sites for no functional benefit (this only affects React Fast Refresh
// granularity in dev).
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
