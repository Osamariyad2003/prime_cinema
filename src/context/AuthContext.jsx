import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const profileData = await fetchProfile(token);
                    setUser(profileData);
                } catch (error) {
                    console.error('Session expired');
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

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
