import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import { Link } from 'react-router-dom';

const models = [
    {
        icon: 'fa-solid fa-map-location-dot',
        title: 'Access to Distribution',
        desc: 'Pan India and regional community driven channels with proven reach across offline and digital environments.',
        color: '#FF4500',
    },
    {
        icon: 'fa-solid fa-rocket',
        title: 'Go To Market (GTM) Execution',
        desc: 'End to end support for market entry, testing, and scaling, taking your brand from initial strategy to active on ground deployment.',
        color: '#FFB347',
    },
    {
        icon: 'fa-solid fa-share-nodes',
        title: 'Affiliate Stack Creation',
        desc: 'Performance linked distribution ecosystems built to scale revenue through partner networks.',
        color: '#9999FE',
    },
    {
        icon: 'fa-solid fa-microchip',
        title: 'AI Marketing Infrastructure',
        desc: 'AI SEO, ORM, attribution, and optimization layers that drive compounding returns.',
        color: '#81E4BA',
    },
    {
        icon: 'fa-solid fa-star-half-stroke',
        title: 'Online Reputation Management',
        desc: 'Systematic ORM to build and protect brand perception across digital channels.',
        color: '#FF885C',
    },
    {
        icon: 'fa-solid fa-gears',
        title: 'Capability & Resource Sharing',
        desc: 'Shared talent, technology, and operational resources for accelerated execution.',
        color: '#FBC768',
    },
    {
        icon: 'fa-solid fa-bullseye',
        title: 'Consulting & Expansion Projects',
        desc: 'Strategic consulting on growth, market expansion, and distribution architecture.',
        color: '#FF4500',
    },
];

const partnerTypes = [
    { icon: 'fa-solid fa-bag-shopping', label: 'Consumer Brands & D2C Companies' },
    { icon: 'fa-solid fa-bowl-food', label: 'FMCG & Youth First Brands' },
    { icon: 'fa-solid fa-credit-card', label: 'Fintech & Consumer Internet Platforms' },
    { icon: 'fa-solid fa-house-chimney-window', label: 'Community First Businesses' },
    { icon: 'fa-solid fa-palette', label: 'Creative, Media & Performance Agencies' },
    { icon: 'fa-solid fa-earth-americas', label: 'Expansion Focused Enterprises' },
];

const offers = [
    'Proprietary distribution channels',
    'Sales linked activations and events access',
    'Co IP and co brand solution creation',
    'Demand generation and clientele access',
    'Franchise led expansion models',
    'Strategic investment and growth options',
];

const PariPartnerships = () => {
    return (
        <div className="bg-(--pari-bg-primary) min-h-screen text-(--pari-text-primary) font-sans transition-colors">
            <PariNavbar />

            {/* ── PAGE HERO ─────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-200 mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8 transition-colors">
                        Partnerships
                    </span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-none text-(--pari-text-primary) mb-6 transition-colors">
                        Built for{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>forward looking</em>{' '}
                        organizations
                    </h1>
                    <p className="text-[19px] text-(--pari-text-secondary) leading-relaxed max-w-145 mx-auto mb-12 transition-colors">
                        We collaborate with brands, agencies, and platforms on strategic synergies, co creation, and long term growth partnerships.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                    >
                        Start a Partnership
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </div>
            </section>

            {/* ── WHO WE PARTNER WITH ────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">Who We Partner With</span>
                        <h2 className="text-[38px] md:text-[48px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">Organizations we collaborate with</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {partnerTypes.map((p) => (
                            <div key={p.label} className="flex items-center gap-4 bg-(--pari-bg-secondary)/50 dark:bg-white/4 border border-(--pari-border) rounded-2xl p-6 hover:bg-(--pari-bg-secondary) dark:hover:bg-white/7 hover:border-[#FF4500]/25 transition-all shadow-sm dark:shadow-none transition-colors group">
                                <i className={`${p.icon} text-[32px] text-[#FF4500] shrink-0 group-hover:scale-110 transition-transform`}></i>
                                <span className="text-[16px] font-medium text-(--pari-text-primary) transition-colors">{p.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PARTNERSHIP MODELS ─────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">Partnership Models</span>
                        <h2 className="text-[38px] md:text-[48px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">How we work together</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {models.map((m, i) => (
                            <div key={m.title} className="relative bg-(--pari-bg-secondary) dark:bg-white/3 border border-(--pari-border) rounded-2xl p-7 hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-white/6 hover:border-(--pari-border) transition-all group overflow-hidden shadow-sm dark:shadow-none">
                                <div
                                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                                    style={{ background: m.color }}
                                />
                                <i className={`${m.icon} text-[36px] text-[#FF4500] mb-4 block group-hover:scale-110 transition-transform`}></i>
                                <h3 className="text-[17px] font-bold text-(--pari-text-primary) mb-2 group-hover:text-[#FF4500] transition-colors">{m.title}</h3>
                                <p className="text-[14px] text-(--pari-text-secondary) leading-relaxed transition-colors">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT PARIVESTRA OFFERS ─────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-250 mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">What Parivestra Offers</span>
                        <h2 className="text-[38px] md:text-[48px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">Exclusive partner benefits</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {offers.map((o) => (
                            <div key={o} className="flex items-center gap-4 bg-(--pari-bg-secondary) dark:bg-white/4 border border-(--pari-border) rounded-xl p-5 hover:border-[#FF4500]/30 transition-all group shadow-sm dark:shadow-none">
                                <div className="w-8 h-8 rounded-lg bg-[#FF4500]/15 flex items-center justify-center shrink-0 group-hover:bg-[#FF4500]/25 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4500" strokeWidth="2.5">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <span className="text-[15px] font-medium text-(--pari-text-primary) transition-colors">{o}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GET IN TOUCH ───────────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-175 mx-auto text-center">
                    <h2 className="text-[38px] md:text-[52px] font-bold tracking-tight text-(--pari-text-primary) mb-6 transition-colors">
                        Ready to partner with{' '}
                        <span style={{ color: '#FF4500' }}>Parivestra?</span>
                    </h2>
                    <p className="text-[18px] text-(--pari-text-secondary) leading-relaxed mb-10 transition-colors">
                        Whether you're looking for onboarding, alliances, or strategic collaborations, we invite you to reach out and explore what we can build together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[16px] font-semibold rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
                        >
                            Email Us
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <a
                            href="https://www.canva.com/design/DAGnCSjB6Gg/phbckJVpepIfHc_prCwpxg/edit"
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-4 bg-(--pari-bg-secondary) dark:bg-white/8 text-(--pari-text-primary) dark:text-white text-[16px] font-medium rounded-[14px] hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-white/15 transition-all border border-(--pari-border) flex items-center justify-center gap-2 transition-colors"
                        >
                            View Case Studies
                        </a>
                    </div>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariPartnerships;
