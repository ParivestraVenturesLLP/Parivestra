import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoBright from '../assets/logo_bright.png';
import logoIcon from '../assets/logo_icon.png';
import { useTheme } from '../context/ThemeContext';
import AIAssistant from '../components/AIAssistant';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Partnerships', to: '/partnerships' },
    { label: 'Clientele', to: '/clientele' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Distribution', to: '/distribution' },
    { label: 'About', to: '/about' },
    { label: 'AI & Apps', to: '/ai-apps' },
    { label: 'Contact', to: '/contact' },
];

const socialLinks = [
    { label: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/parivestra.official/' },
];

const PariFooter = () => {
    const { theme } = useTheme();

    return (
        <section className="bg-[var(--pari-bg-secondary)] py-12 px-4 w-full border-t border-[var(--pari-border)] transition-colors">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6 text-center">
                <Link to="/" className="flex items-center gap-2.5">
                    <img src={logoIcon} alt="Icon" className="h-9 w-auto object-contain" />
                    <img src={theme === 'light' ? logoBright : logo} alt="Parivestra" className="h-6 w-auto object-contain" />
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                    <span className="text-[var(--pari-text-secondary)] text-[13px] font-medium transition-colors">© 2026</span>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[var(--pari-text-secondary)] font-medium">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="hover:text-[var(--pari-text-primary)] transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <span className="text-[var(--pari-text-secondary)] text-[13px] transition-colors">Distribution, engineered for outcomes.</span>

                    <div className="flex items-center gap-3">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Follow Parivestra on ${s.label}`}
                                className="w-9 h-9 rounded-full border border-[var(--pari-border)] flex items-center justify-center text-[var(--pari-text-secondary)] hover:text-[#FF4500] hover:border-[#FF4500]/40 transition-colors"
                            >
                                <i className={`${s.icon} text-[15px]`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <AIAssistant />
        </section>
    );
};

export default PariFooter;
