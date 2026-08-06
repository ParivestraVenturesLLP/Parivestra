import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/adminApi';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            await loginAdmin(password);
            sessionStorage.setItem('pari_admin_pw', password);
            navigate('/admin');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message || 'Incorrect password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--pari-bg-primary) text-(--pari-text-primary) px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-90 bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl p-8 shadow-xl"
            >
                <h1 className="text-[22px] font-bold mb-1">Admin Dashboard</h1>
                <p className="text-[14px] text-(--pari-text-secondary) mb-6">Enter the admin password to view leads.</p>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoFocus
                    className="w-full bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-4 py-3 text-[14px] text-(--pari-text-primary) placeholder:text-(--pari-text-secondary)/60 focus:outline-none focus:border-[#FF4500]/50 transition-colors"
                />

                {status === 'error' && (
                    <p className="mt-3 text-[13px] text-red-500 font-medium">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={status === 'submitting' || !password}
                    className="w-full mt-6 py-3 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[15px] font-semibold rounded-lg hover:from-[#E03D00] hover:to-[#FF4500] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Checking...' : 'Log In'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
