import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './auth.css';

const BrandSignup = () => {
    const [brandName, setBrandName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, mockupMode } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setLoading(true);
        try {
            const userData = {
                brand_name: brandName,
                full_name: fullName,
                email: email,
                password: password,
                role: 'brand_user'
            };
            await signup(userData);
            navigate('/brand/login', { state: { message: 'Brand signup successful! Please log in.' } });
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (mockupMode) {
        return (
            <div className="auth-container">
                <div className="auth-form">
                    <h2>🎭 Mockup Mode Active</h2>
                    <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #2196f3' }}>
                        <p style={{ margin: 0, color: '#1976d2' }}>
                            <strong>Authentication is disabled.</strong> You can access all sections directly.
                        </p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h4>Quick Access:</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                            <button onClick={() => navigate('/brand/dashboard')} className="btn btn-success">Brand Dashboard</button>
                        </div>
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', fontSize: '14px' }}>
                        <p style={{ margin: 0, color: '#666' }}>
                            Use the role switcher in the bottom-right corner to change your role and see different views.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Brand Registration</h2>
                <p>Create a brand account to manage your complaints and team.</p>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="brandName">Brand Name</label>
                    <input
                        type="text"
                        id="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                        autoComplete="organization"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Your Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Creating Brand Account...' : 'Create Brand Account'}
                </button>
                <p className="auth-switch">
                    Already have a brand account? <Link to="/brand/login">Brand Login</Link>
                </p>
            </form>
        </div>
    );
};

export default BrandSignup;