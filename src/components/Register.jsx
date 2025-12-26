import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
// import './Auth.css'; // Remove after migration

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await register({ name, email, password });
            loginUser(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-20">
            <div className="bg-neutral-900 border border-neutral-800 p-10 w-full max-w-md text-center rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Join the Club</h2>
                <p className="text-gray-400 mb-6 text-sm">Register for Prime Loyalty rewards</p>
                {error && <div className="bg-red-900/20 border border-red-600 text-white py-3 px-4 mb-5 text-sm rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 bg-black border border-neutral-700 text-white text-base rounded focus:outline-none focus:border-white transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="w-full px-4 py-3 bg-black border border-neutral-700 text-white text-base rounded focus:outline-none focus:border-white transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 6 characters"
                            minLength="6"
                            required
                            className="w-full px-4 py-3 bg-black border border-neutral-700 text-white text-base rounded focus:outline-none focus:border-white transition"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-red-600 text-white rounded px-4 py-3 text-xs font-bold uppercase hover:bg-red-700 focus:bg-red-700 transition"
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
                <p className="mt-6 text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white underline hover:text-red-600 transition">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
