import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import BookCall from '../components/ui/BookCall';
import { IconMenu, IconClose } from '../components/ui/icons';
import { nav } from '../content/homeContent';

// Two floating pills, as on Quantara: logo · links + primary CTA.
// Nav per plan §13: Outcomes | Solutions | Consumer Mesh | Case Studies | About | BOOK A CALL →
const pill = 'rounded-full border border-bone/10 bg-[#0d0c0a]/90 backdrop-blur-sm';

const PariNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => { setMenuOpen(false); }, [location.pathname, location.hash]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const isActive = (to) => !to.includes('#') && (location.pathname === to || location.pathname.startsWith(`${to}/`));

    return (
        <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
            <div className="flex w-full max-w-[860px] items-center justify-between gap-3 lg:w-auto lg:justify-center">
                <Link to="/" aria-label="Parivestra home" className={`flex h-[52px] items-center px-6 sm:h-[58px] sm:px-7 ${pill}`}>
                    <img src={logo} alt="Parivestra" className="h-[19px] w-auto object-contain" />
                </Link>

                <nav aria-label="Primary" className={`hidden h-[58px] items-center gap-1 pl-3 pr-2 lg:flex ${pill}`}>
                    {nav.map((l) => (
                        <Link
                            key={l.label}
                            to={l.to}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] transition-colors hover:text-bone ${isActive(l.to) ? 'text-bone' : 'text-bone/65'}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <BookCall section="nav" size="sm" variant="bone" className="ml-2 whitespace-nowrap" />
                </nav>

                <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    className={`flex h-[52px] w-[52px] items-center justify-center text-bone lg:hidden ${pill}`}
                >
                    {menuOpen ? <IconClose size={18} /> : <IconMenu size={18} />}
                </button>
            </div>

            {menuOpen && (
                <div className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink px-6 pb-28 pt-8 lg:hidden">
                    {nav.map((l, i) => (
                        <Link key={l.label} to={l.to} className="flex items-baseline gap-4 border-b border-bone/10 py-5">
                            <span className="label text-copper">0{i + 1}</span>
                            <span className="display display-md">{l.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default PariNavbar;
