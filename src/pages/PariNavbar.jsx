import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoBright from '../assets/logo_bright.png';
import logoIcon from '../assets/logo_icon.png';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'AI & Apps', to: '/ai-apps' },
    { label: 'Partnerships', to: '/partnerships' },
    { label: 'Clientele', to: '/clientele' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Distribution', to: '/distribution' },
    { label: 'About', to: '/about' },
];

const PariNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-(--pari-bg-primary)/85 backdrop-blur-md border-b border-(--pari-border) shadow-lg shadow-black/5'
            : 'bg-transparent'
            }`}>
            <div className="max-w-360 mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logoIcon}
                        alt="Parivestra Icon"
                        className={`${scrolled ? 'h-8' : 'h-10'} w-auto object-contain transition-all duration-300 group-hover:scale-105`}
                    />
                    <img
                        src={theme === 'light' ? logoBright : logo}
                        alt="Parivestra Logo"
                        className={`${scrolled ? 'h-6' : 'h-8'} w-auto object-contain transition-all duration-300`}
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 ${isActive(link.to)
                                ? 'text-[#FF4500] bg-[#FF4500]/10'
                                : 'text-(--pari-text-secondary) hover:text-(--pari-text-primary) hover:bg-(--pari-border)'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        to="/contact"
                        onClick={() => window.fbq && window.fbq('track', 'Contact')}
                        className="hidden lg:flex px-5 py-2.5 text-[14px] font-semibold bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white rounded-[12px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                    >
                        Partner With Us
                    </Link>
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        className="lg:hidden p-2 rounded-lg text-(--pari-text-secondary) hover:text-(--pari-text-primary) hover:bg-(--pari-border)"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-(--pari-bg-primary)/98 backdrop-blur-xl border-t border-(--pari-border) px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${isActive(link.to)
                                ? 'text-[#FF4500] bg-[#FF4500]/10'
                                : 'text-(--pari-text-secondary) hover:text-(--pari-text-primary) hover:bg-(--pari-border)'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => {
                            setMenuOpen(false);
                            window.fbq && window.fbq('track', 'Contact');
                        }}
                        className="mt-2 px-5 py-3 text-[15px] font-semibold bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white rounded-[12px] text-center"
                    >
                        Partner With Us
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default PariNavbar;
