import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoBright from '../assets/logo_bright.png';
import logoIcon from '../assets/logo_icon.png';
import logoIconBright from '../assets/logo_icon_bright.png';
import { useTheme } from '../context/ThemeContext';
import ImageCarousel from '../components/ImageCarousel';

const PariFooter = () => {
    const { theme } = useTheme();
    const gradientTextRef = useRef(null);

    useEffect(() => {
        const element = gradientTextRef.current;
        if (!element) return;

        function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
        function getRandom(min, max) { return Math.random() * (max - min) + min; }
        function interpolate(v1, v2, f) { return v1 + (v2 - v1) * f; }

        function animateGradient(duration, ps1, ps2, px, py, el) {
            if (!el) return;
            const ns1 = getRandom(35, 55), ns2 = getRandom(85, 100);
            const nx = getRandom(30, 70), ny = getRandom(30, 70);
            const startTime = performance.now();

            function update(now) {
                const factor = Math.min((now - startTime) / duration, 1);
                const ef = easeInOutQuad(factor);
                if (el?.style) {
                    el.style.setProperty('--gs1', `${interpolate(ps1, ns1, ef)}%`);
                    el.style.setProperty('--gs2', `${interpolate(ps2, ns2, ef)}%`);
                    el.style.setProperty('--gx', `${interpolate(px, nx, ef)}%`);
                    el.style.setProperty('--gy', `${interpolate(py, ny, ef)}%`);
                }
                if (factor < 1) requestAnimationFrame(update);
                else animateGradient(duration, ns1, ns2, nx, ny, el);
            }
            requestAnimationFrame(update);
        }
        animateGradient(1200, 49.83, 99.99, 54.31, 61.46, element);
    }, []);

    return (
        <section className="bg-[var(--pari-bg-secondary)] py-24 px-4 w-full border-t border-[var(--pari-border)] transition-colors">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pari-gradient-text {
                    color: transparent;
                    background: radial-gradient(100% 100% at var(--gx,50%) var(--gy,50%),
                        #FF6B35 0%, #FF4500 var(--gs1,50%), #FFB347 var(--gs2,100%));
                    -webkit-background-clip: text; background-clip: text;
                    filter: drop-shadow(0 0 10px rgba(255,69,0,0.25));
                    display: inline-block;
                }
            `}} />

            <div className="max-width-[1440px] mx-auto">
                {/* Instagram Showcase */}
                <div className="mb-24 flex flex-col items-center">
                    <div className="w-full max-w-[1200px] bg-[var(--pari-bg-primary)] rounded-[24px] overflow-hidden border border-[var(--pari-border)] shadow-2xl shadow-black/20">
                        <div className="p-6 border-b border-[var(--pari-border)] flex items-center justify-between bg-gradient-to-r from-[var(--pari-bg-secondary)] to-[var(--pari-bg-primary)]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[var(--pari-bg-primary)] flex items-center justify-center text-white">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[var(--pari-text-primary)] font-bold text-[16px] leading-tight">Parivestra Official</h3>
                                    <p className="text-[var(--pari-text-secondary)] text-[12px]">@parivestra.official</p>
                                </div>
                            </div>
                            <a
                                href="https://www.instagram.com/parivestra.official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#0095F6] hover:bg-[#1877F2] text-white text-[13px] font-bold rounded-lg transition-colors"
                            >
                                Follow
                            </a>
                        </div>
                        <div className="w-full aspect-video md:aspect-[16/10] lg:aspect-[21/9] min-h-[450px]">
                            <iframe
                                src="https://www.instagram.com/parivestra.official/embed/"
                                className="w-full h-full border-none"
                                scrolling="no"
                                allowTransparency="true"
                                frameBorder="0"
                                title="Parivestra Instagram Feed"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Image Carousel Showcase */}
                <div className="mb-24">
                    <ImageCarousel />
                </div>

                {/* CTA Headline */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-[var(--pari-text-primary)] text-[40px] md:text-[60px] font-bold tracking-tight leading-[1.05] uppercase mb-6 flex flex-col items-center gap-6 transition-colors">
                        Partner with<br />
                        <div className="flex items-center gap-4">
                            <img src={logoIcon} alt="Parivestra Icon" className="h-16 md:h-20 w-auto object-contain" />
                            <img src={theme === 'light' ? logoBright : logo} alt="Parivestra" className="h-12 md:h-16 w-auto object-contain" />
                        </div>
                    </h2>
                    <p className="text-[var(--pari-text-secondary)] text-[18px] max-w-[480px] leading-relaxed mb-10 transition-colors">
                        We actively collaborate with brands, agencies, and platforms on strategic synergies and long-term growth.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50"
                    >
                        Get In Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Nav Links */}
                <div className="border-t border-[var(--pari-border)] pt-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 opacity-50">
                            <img src={logoIcon} alt="Icon" className="h-6 w-auto object-contain" />
                            <img src={theme === 'light' ? logoBright : logo} alt="Parivestra" className="h-4 w-auto object-contain" />
                        </div>
                        <span className="text-[var(--pari-text-secondary)] text-[13px] font-medium transition-colors">© 2025</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--pari-text-secondary)] font-medium">
                        <Link to="/" className="hover:text-[var(--pari-text-primary)] transition-colors">Home</Link>
                        <Link to="/partnerships" className="hover:text-[var(--pari-text-primary)] transition-colors">Partnerships</Link>
                        <Link to="/clientele" className="hover:text-[var(--pari-text-primary)] transition-colors">Clientele</Link>
                        <Link to="/case-studies" className="hover:text-[var(--pari-text-primary)] transition-colors">Case Studies</Link>
                        <Link to="/distribution" className="hover:text-[var(--pari-text-primary)] transition-colors">Distribution</Link>
                        <Link to="/about" className="hover:text-[var(--pari-text-primary)] transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-[var(--pari-text-primary)] transition-colors">Contact</Link>
                    </div>
                    <div className="text-[13px] text-[var(--pari-text-secondary)] transition-colors">Distribution, engineered for outcomes.</div>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/910000000000" // Placeholder, user should update this
                id="whatsappBtn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout')}
                className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
            >
                <i className="fa-brands fa-whatsapp text-[32px]"></i>
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-[12px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                    Chat with us
                </span>
            </a>
        </section>
    );
};

export default PariFooter;
