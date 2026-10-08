import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logoMark from '../../assets/logo_mark.png';
import { IconMenu, IconClose } from '../ui/icons';

const navLinks = [
    { label: 'Distribution', to: '/distribution' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'About', to: '/about' },
];

// Dedicated, minimal header for the campaign page: same logo lockup and pill language
// as the main site nav, but only the two conversion actions this page cares about —
// both open an in-page modal instead of navigating away.
const FestiveHeader = ({ onBookNow, onContact }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5 lg:px-10">
            <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-3 rounded-full border border-bone/10 bg-ink/85 px-3 py-2 backdrop-blur-md sm:px-4">
                <Link to="/" aria-label="Parivestra home" className="flex h-[44px] shrink-0 items-center gap-2.5 px-2 sm:h-[48px]">
                    <img src={logoMark} alt="" aria-hidden="true" className="h-[24px] w-auto object-contain sm:h-[26px]" />
                    <img src={logo} alt="Parivestra" className="h-[13px] w-auto object-contain sm:h-[15px]" />
                </Link>

                <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((l) => (
                        <Link key={l.label} to={l.to} className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] text-bone/65 transition-colors hover:text-bone">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 sm:flex">
                    <button type="button" onClick={onContact} className="label whitespace-nowrap rounded-full border border-bone/15 px-5 py-3 text-[11px] text-bone/80 transition-colors hover:border-amber hover:text-amber">
                        Contact us
                    </button>
                    <button type="button" onClick={onBookNow} className="label whitespace-nowrap rounded-full bg-amber px-5 py-3 text-[11px] text-ink transition-colors hover:bg-bone">
                        Book now
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-bone/12 text-bone sm:hidden"
                >
                    {menuOpen ? <IconClose size={16} /> : <IconMenu size={16} />}
                </button>
            </div>

            {menuOpen && (
                <div className="mx-3 mt-2 rounded-2xl border border-bone/10 bg-ink/95 p-5 backdrop-blur-md sm:hidden">
                    {navLinks.map((l) => (
                        <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 border-b border-bone/10 py-4 text-[15px] text-bone/80">
                            {l.label}
                        </Link>
                    ))}
                    <div className="mt-4 flex gap-2">
                        <button type="button" onClick={() => { setMenuOpen(false); onContact(); }} className="label flex-1 rounded-full border border-bone/15 py-3 text-[11px] text-bone/80">
                            Contact us
                        </button>
                        <button type="button" onClick={() => { setMenuOpen(false); onBookNow(); }} className="label flex-1 rounded-full bg-amber py-3 text-[11px] text-ink">
                            Book now
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default FestiveHeader;
