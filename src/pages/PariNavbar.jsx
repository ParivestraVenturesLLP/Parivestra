import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoMark from '../assets/logo_mark.png';
import BookCall from '../components/ui/BookCall';
import { IconMenu, IconClose } from '../components/ui/icons';
import { nav } from '../content/homeContent';

// Logo pinned to the left edge (matching every other section's content margin); the
// links + primary CTA pill stays centered in the header regardless. A 3-column grid
// (1fr / auto / 1fr) is what keeps the middle pill truly centered on the page even
// though the logo and the (empty, desktop-only-hidden) right slot aren't the same
// width — equal 1fr side tracks, not the logo's own width, is what centers it.
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
        <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5 lg:px-10">
            <div className="mx-auto grid w-full max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center gap-3">
                <Link to="/" aria-label="Parivestra home" className={`flex h-[52px] w-fit shrink-0 items-center gap-2.5 px-5 justify-self-start sm:h-[58px] sm:px-6 ${pill}`}>
                    <img src={logoMark} alt="" aria-hidden="true" className="h-[26px] w-auto object-contain sm:h-[30px]" />
                    <img src={logo} alt="Parivestra" className="h-[15px] w-auto object-contain sm:h-[17px]" />
                </Link>

                <nav aria-label="Primary" className={`hidden h-[58px] items-center gap-1 pl-3 pr-2 justify-self-center lg:flex ${pill}`}>
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
                    className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center text-bone justify-self-end lg:hidden ${pill}`}
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
