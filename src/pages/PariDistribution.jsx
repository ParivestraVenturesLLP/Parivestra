import React, { useEffect } from 'react';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import { Link } from 'react-router-dom';

const segments = [
    {
        id: 'colleges',
        icon: 'fa-solid fa-graduation-cap',
        color: '#FF4500',
        title: 'College & Campus Networks',
        type: 'Offline',
        desc: 'Direct access to 500+ college campuses across India. From on-ground events to ambassador programs, we activate student communities at scale.',
        metrics: ['500+ Campuses', 'Pan-India', 'High Intent'],
    },
    {
        id: 'rwa',
        icon: 'fa-solid fa-city',
        color: '#9999FE',
        title: 'RWA & Residential Communities',
        type: 'Offline',
        desc: 'Hyper-local residential society activations across metros and Tier-2 cities. High-trust, high-dwell environments with captive audiences.',
        metrics: ['Metros + Tier-2', 'High Trust', 'Captive Audience'],
    },
    {
        id: 'turfs',
        icon: 'fa-solid fa-futbol',
        color: '#81E4BA',
        title: 'Turfs, Sports & Lifestyle',
        type: 'Offline',
        desc: 'Sports turfs, gyms, and active lifestyle communities. High-energy brand touchpoints with youth-first, health-conscious audiences.',
        metrics: ['Youth-First', 'Active Communities', 'Lifestyle Fit'],
    },
    {
        id: 'events',
        icon: 'fa-solid fa-calendar-check',
        color: '#FFB347',
        title: 'Events & On-Ground Activations',
        type: 'Offline',
        desc: 'Curated brand experiences at tech summits, music festivals, college fests, and corporate events. Immersive, memorable touchpoints.',
        metrics: ['Brand Immersion', 'Live Activation', 'High Engagement'],
    },
    {
        id: 'performance',
        icon: 'fa-solid fa-chart-pie',
        color: '#FF885C',
        title: 'Performance & Affiliate Marketing',
        type: 'Digital',
        desc: 'Revenue-linked digital distribution through affiliate networks, CPA-based campaigns, and performance-optimized media stacks.',
        metrics: ['Revenue-Linked', 'CPA / CPI Models', 'Scalable'],
    },
    {
        id: 'influencer',
        icon: 'fa-solid fa-users-viewfinder',
        color: '#9999FE',
        title: 'Influencer Ecosystems',
        type: 'Digital',
        desc: 'End-to-end influencer campaigns from nano to macro creators across major and emerging platforms, ensuring all initiatives link directly to sales conversions.',
        metrics: ['Nano to Macro', 'Sales-Linked', 'Multi-Platform'],
    },
    {
        id: 'ai-seo',
        icon: 'fa-solid fa-microchip',
        color: '#FBC768',
        title: 'AI SEO & ORM',
        type: 'Digital',
        desc: 'Intelligent search optimization, active reputation management, and content planning designed for compounded visibility over time.',
        metrics: ['AI-Powered', 'Compounding Returns', 'Brand Trust'],
    },
    {
        id: 'global',
        icon: 'fa-solid fa-earth-americas',
        color: '#81E4BA',
        title: 'Global Digital Reach',
        type: 'Digital',
        desc: 'Executing performance marketing, affiliate programs, and AI-driven campaigns across high-value markets including the US, UAE, ASEAN, and Australia.',
        metrics: ['US • UAE • ASEAN • AU', 'Performance Stack', 'International'],
    },
];

const PariDistribution = () => {
    useEffect(() => {
        if (window.fbq) {
            window.fbq('track', 'ViewContent', { content_name: 'Services Page' });
        }
    }, []);

    return (
        <div className="bg-[var(--pari-bg-primary)] min-h-screen text-[var(--pari-text-primary)] font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-[800px] mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8">Distribution Segments</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-[1.0] text-[var(--pari-text-primary)] mb-6 transition-colors">
                        Every distribution{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>lever, activated</em>
                    </h1>
                    <p className="text-[19px] text-[var(--pari-text-secondary)] leading-relaxed max-w-[580px] mx-auto transition-colors">
                        We leverage a diverse mix of owned and partnered channels to engage audiences effectively across deep physical and online ecosystems.
                    </p>
                </div>
            </section>

            {/* ── TABS: OFFLINE + DIGITAL ───────────────────── */}
            {['Offline', 'Digital'].map((type) => (
                <section key={type} className={`py-24 px-6 ${type === 'Offline' ? 'bg-[var(--pari-bg-primary)]' : 'bg-[var(--pari-bg-secondary)] dark:bg-[#080F18]'} transition-colors`}>
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex items-center gap-4 mb-12">
                            <div className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest border transition-all flex items-center gap-2 ${type === 'Offline' ? 'bg-[#FF4500]/15 border-[#FF4500]/30 text-[#FF4500]' : 'bg-[#9999FE]/15 border-[#9999FE]/30 text-[#9999FE]'}`}>
                                <i className={`fa-solid ${type === 'Offline' ? 'fa-map-location-dot' : 'fa-globe'}`}></i>
                                {type === 'Offline' ? 'Offline Distribution' : 'Digital Distribution'}
                            </div>
                            <div className="flex-1 h-px bg-[var(--pari-border)] transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {segments.filter((s) => s.type === type).map((seg) => (
                                <div
                                    key={seg.id}
                                    className="bg-[var(--pari-bg-secondary)] dark:bg-white/3 border border-[var(--pari-border)] rounded-2xl p-7 hover:bg-[var(--pari-bg-secondary)]/80 dark:hover:bg-white/6 hover:border-[var(--pari-border)] transition-all group relative overflow-hidden shadow-sm dark:shadow-none"
                                >
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-8 group-hover:opacity-15 transition-opacity" style={{ background: seg.color }} />
                                    <div className="flex items-start gap-5 mb-5 group">
                                        <i className={`${seg.icon} text-[44px] shrink-0 text-[#FF4500] group-hover:scale-110 transition-transform duration-300`}></i>
                                        <div>
                                            <h3 className="text-[19px] font-bold text-[var(--pari-text-primary)] group-hover:text-[#FF4500] transition-colors mb-1">{seg.title}</h3>
                                            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: seg.color }}>{seg.type}</span>
                                        </div>
                                    </div>
                                    <p className="text-[15px] text-[var(--pari-text-secondary)] leading-relaxed mb-6 transition-colors">{seg.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {seg.metrics.map((m) => (
                                            <span key={m} className="px-3 py-1 bg-[var(--pari-bg-primary)]/60 dark:bg-white/6 border border-[var(--pari-border)] rounded-lg text-[12px] font-medium text-[var(--pari-text-secondary)] transition-colors">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* ── PARTNERSHIP SCALE LINK ────────────────────── */}
            <section className="py-24 px-6 bg-[var(--pari-bg-primary)] transition-colors">
                <div className="max-w-[700px] mx-auto text-center">
                    <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-[var(--pari-text-primary)] mb-6 transition-colors">
                        Partnership Scale | <span style={{ color: '#FF4500' }}>Parivestra</span>
                    </h2>
                    <p className="text-[17px] text-[var(--pari-text-secondary)] leading-relaxed mb-10 transition-colors">
                        Ready to unlock access to Parivestra's proprietary distribution network? Let's build your growth infrastructure together.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                    >
                        Explore Partnership
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariDistribution;
