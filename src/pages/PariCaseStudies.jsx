import React from 'react';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import ScrollReveal from '../components/ScrollReveal';

// Import local logos
import swiggyLogo from '../assets/swiggy.png';
import uberLogo from '../assets/uber.png';
import flixbusLogo from '../assets/flixbus.png';
import nestleLogo from '../assets/nestle.png';
import myntraLogo from '../assets/myntra.jpg';

const caseStudies = [
    {
        brand: 'Swiggy',
        logo: swiggyLogo,
        category: 'Food Delivery',
        color: '#FF4500',
        title: 'Hyper-local Community Distribution for Swiggy',
        outcomes: ['Campus activation across 50+ colleges', 'Community-first GTM in Tier-2 cities', 'Correlated brand trials with app installs'],
        tags: ['Offline Activation', 'Community GTM', 'Data Attribution'],
    },
    {
        brand: 'Uber',
        logo: uberLogo,
        category: 'Mobility',
        color: '#9999FE',
        title: 'Uber Rider Acquisition via UGC & Influencers',
        outcomes: ['UGC campaigns across 15+ cities', 'Influencer-driven first-ride conversions', 'AI-led attribution to ride completions'],
        tags: ['UGC Campaigns', 'Influencer Marketing', 'AI Attribution'],
    },
    {
        brand: 'FlixBus',
        logo: flixbusLogo,
        category: 'Intercity Travel',
        color: '#81E4BA',
        title: 'FlixBus Market Entry & Distribution Stack',
        outcomes: ['Pan-India affiliate ecosystem built', 'ORM strategy for brand trust building', 'Performance marketing across 20 routes'],
        tags: ['GTM Execution', 'Affiliate Stack', 'ORM'],
    },
    {
        brand: 'Nestlé',
        logo: nestleLogo,
        category: 'FMCG',
        color: '#FFB347',
        title: 'Nestlé Youth-First Community Engagement',
        outcomes: ['RWA and turf activations nationwide', 'Brand visibility to sales correlation tracked', 'Community-led product sampling campaigns'],
        tags: ['Offline Distribution', 'Community Activation', 'Sales Correlation'],
    },
    {
        brand: 'Meesho',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png',
        category: 'Social Commerce',
        color: '#FF885C',
        title: 'Meesho Seller Ecosystem Expansion',
        outcomes: ['Affiliate seller network built in Tier-3 markets', 'On-ground reseller activation campaigns', 'Revenue-linked distribution across 8 states'],
        tags: ['Affiliate Commerce', 'On-Ground Activation', 'Revenue Attribution'],
    },
    {
        brand: 'Myntra',
        logo: myntraLogo,
        category: 'Fashion E-Commerce',
        color: '#FBC768',
        title: 'Myntra Campus & Youth Distribution',
        outcomes: ['College influencer ambassador program', 'High-intent fashion community targeting', 'Sales-correlated brand presence tracking'],
        tags: ['Influencer Ecosystem', 'Campus GTM', 'Performance Tracking'],
    },
];

const PariCaseStudies = () => {
    return (
        <div className="bg-(--pari-bg-primary) min-h-screen text-(--pari-text-primary) font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-190 mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8 transition-colors">Case Studies</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-none text-(--pari-text-primary) mb-6 transition-colors">
                        Real distribution.{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>Real outcomes.</em>
                    </h1>
                    <p className="text-[19px] text-(--pari-text-secondary) leading-relaxed max-w-140 mx-auto mb-12 transition-colors">
                        Explore detailed case studies showcasing how Parivestra solved complex distribution challenges and scaled brands across offline and digital ecosystems.
                    </p>
                    <a
                        href="https://drive.google.com/file/d/14sm-jmkoAbmcyzgFmxZ0Ryg4Xdeh6Bo3/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                    >
                        View Full Case Study Doc
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>
                </div>
            </section>

            {/* ── WHAT WE PROVE ─────────────────────────────── */}
            <section className="py-16 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-275 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
                        {[
                            { icon: 'fa-solid fa-building-circle-check', label: 'Complex distribution challenges solved' },
                            { icon: 'fa-solid fa-earth-asia', label: 'Community-first GTM strategies built' },
                            { icon: 'fa-solid fa-chart-line', label: 'Brand visibility correlated with sales' },
                            { icon: 'fa-solid fa-arrows-spin', label: 'Brands scaled across offline + digital' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-4 bg-(--pari-bg-secondary)/50 dark:bg-white/4 border border-(--pari-border) rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors group">
                                <i className={`${item.icon} text-[32px] text-[#FF4500] shrink-0 group-hover:scale-110 transition-transform`}></i>
                                <span className="text-[15px] font-medium text-(--pari-text-secondary) leading-snug transition-colors">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASE STUDY CARDS ──────────────────────────── */}
            <section className="py-16 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-275 mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">Performance First</span>
                        <h2 className="text-[38px] md:text-[48px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">Case Studies | UGC Campaigns</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {caseStudies.map((cs, i) => (
                            <ScrollReveal
                                key={cs.brand}
                                delay={(i % 2) * 120}
                                className="bg-(--pari-bg-secondary) dark:bg-[#080F18] border border-(--pari-border) rounded-2xl overflow-hidden hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-[#0c1622] hover:border-[#FF4500]/25 hover:-translate-y-1 transition-all group shadow-sm dark:shadow-none"
                            >
                                {/* Card header */}
                                <div className="p-7 border-b border-(--pari-border) flex items-center gap-5 transition-colors" style={{ background: `linear-gradient(135deg, ${cs.color}18 0%, transparent 70%)` }}>
                                    <div className="w-16 h-16 dark:bg-[#EDEBE6] dark:shadow-sm dark:shadow-black/40 rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-100 dark:border-gray-800">
                                        <img
                                            src={cs.logo}
                                            alt={`${cs.brand} Logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: cs.color }}>{cs.category}</span>
                                        <h3 className="text-[18px] font-bold text-(--pari-text-primary) mt-0.5 group-hover:text-[#FF4500] transition-colors">{cs.title}</h3>
                                    </div>
                                </div>

                                {/* Outcomes */}
                                <div className="p-7">
                                    <p className="text-[12px] font-bold uppercase tracking-widest text-(--pari-text-secondary) mb-4 transition-colors">Key Outcomes</p>
                                    <ul className="flex flex-col gap-2.5 mb-6">
                                        {cs.outcomes.map((o) => (
                                            <li key={o} className="flex items-start gap-3 text-[14px] text-(--pari-text-secondary) transition-colors">
                                                <span className="shrink-0 mt-0.5 text-[#FF4500]">→</span>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-2">
                                        {cs.tags.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-(--pari-bg-primary)/60 dark:bg-white/5 border border-(--pari-border) rounded-lg text-[12px] font-medium text-(--pari-text-secondary) transition-colors">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FULL DOC CTA ──────────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-175 mx-auto text-center bg-(--pari-bg-secondary)/50 dark:bg-white/4 border border-(--pari-border) rounded-2xl p-12 hover:border-[#FF4500]/25 transition-all shadow-sm dark:shadow-none group">
                    <i className="fa-solid fa-file-lines text-[48px] text-[#FF4500] mb-4 block group-hover:scale-110 transition-transform"></i>
                    <h2 className="text-[32px] font-bold text-(--pari-text-primary) mb-4 transition-colors">Full Case Study Document</h2>
                    <p className="text-[16px] text-(--pari-text-secondary) leading-relaxed mb-8 transition-colors">
                        Detailed documentation including strategy decks, execution frameworks, and outcome metrics for each brand engagement.
                    </p>
                    <a
                        href="https://drive.google.com/file/d/14sm-jmkoAbmcyzgFmxZ0Ryg4Xdeh6Bo3/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                    >
                        Open →
                    </a>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariCaseStudies;
