import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 🚀 Frontend interaction with the Flask Backend API (where MongoDB connection resides)
            const response = await fetch('/api/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle successful login (e.g., redirect to the main search page)
                console.log("Login Successful!");
                // window.location.href = '/search'; // Example Redirect
            } else {
                const data = await response.json();
                setError(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Network error. Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                    Sign in to <span className="text-cyan-500">Matcher</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-gray-900"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Submit Button (Teal/Cyan Accent) */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm 
                                    text-lg font-medium text-white transition duration-300 ${loading ? 'bg-cyan-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Link to Signup */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-cyan-500 hover:text-cyan-600 transition duration-300">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;