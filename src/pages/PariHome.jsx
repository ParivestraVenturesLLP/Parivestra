import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import HeroBackground from '../components/HeroBackground';
import DemoPopup from '../components/DemoPopup';
import ToolModal from '../components/ToolModal';
import ToolBannerSlider from '../components/ToolBannerSlider';
import { getTools } from '../services/toolsApi';

// All clientele logos for Homepage Marquee
import amazonLogo from '../assets/amazon.png';
import uberLogo from '../assets/Uber.svg';
import swiggyLogo from '../assets/swiggy.png';
import paytmLogo from '../assets/Paytm.png';
import redbullLogo from '../assets/RedBull.png';
import nestleLogo from '../assets/nestle.png';
import pizzahutLogo from '../assets/PizzaHut.jpg';
import budweiserLogo from '../assets/Budweiser.png';
import gilletteLogo from '../assets/Gillette.jpg';
import hersheysLogo from "../assets/Hershey's.svg";
import nescafeLogo from '../assets/Nescafe.png';
import relianceLogo from '../assets/Reliance.png';
import myntraLogo from '../assets/myntra.jpg';
import meeshoLogo from '../assets/meesho.jpg';
import ndtvLogo from '../assets/NDTV.png';
import indiatodayLogo from '../assets/IndiaToday.png';
import hindustantimesLogo from '../assets/HindustanTimes.jpg';
import tataLogo from '../assets/tataWPL.jpg';
import apolloLogo from '../assets/apollo.jpg';
import wowmomoLogo from '../assets/WOWmomo.jpg';
import idpLogo from '../assets/IDP.png';
import fixdermaLogo from '../assets/FixDerma.avif';
import fastupLogo from '../assets/FastUp.webp';
import hangyoLogo from '../assets/Hangyo.jpg';
import admitadLogo from '../assets/Admitad.webp';
import aptosLogo from '../assets/Apstos.png';
import riseinLogo from '../assets/RiseIn.png';
import stockpeLogo from '../assets/StockPe.png';
import ohiLogo from '../assets/OHI.jpg';
import excellentLogo from '../assets/excellentPublicity.jpg';
import flixbusLogo from '../assets/flixbus.png';

const topLogos = [
    amazonLogo, uberLogo, swiggyLogo, paytmLogo, redbullLogo, nestleLogo, pizzahutLogo,
    budweiserLogo, gilletteLogo, hersheysLogo, nescafeLogo, relianceLogo,
    myntraLogo, meeshoLogo, ndtvLogo, indiatodayLogo, hindustantimesLogo, tataLogo,
    apolloLogo, wowmomoLogo, idpLogo, fixdermaLogo, fastupLogo, hangyoLogo,
    admitadLogo, aptosLogo, riseinLogo, stockpeLogo, ohiLogo, excellentLogo, flixbusLogo
];

/* ── Marquee styles ─────────────────────────────── */
const marqueeCSS = `
  @keyframes pScrollL { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes pScrollR { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  .p-scroll-l { display:flex;width:max-content;animation:pScrollL 40s linear infinite; }
  .p-scroll-r { display:flex;width:max-content;animation:pScrollR 40s linear infinite; }
  .p-marquee:hover .p-scroll-l, .p-marquee:hover .p-scroll-r { animation-play-state:paused; }
`;

const Pill = ({ text, iconClass }) => (
    <div className="flex items-center gap-2.5 bg-(--pari-bg-secondary)/50 dark:bg-white/5 border border-(--pari-border) rounded-xl py-2.5 px-5 whitespace-nowrap mx-2 shadow-sm dark:shadow-none transition-colors">
        <i className={`${iconClass} text-[16px] text-[#FF4500]`}></i>
        <span className="text-[14px] font-medium text-(--pari-text-primary) transition-colors">{text}</span>
    </div>
);

const toolAccentColors = ['#FF4500', '#FFB347', '#9999FE', '#81E4BA', '#FBC768', '#FF885C'];

const ToolCard = ({ tool, color, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center gap-3 bg-(--pari-bg-secondary)/50 dark:bg-white/5 border border-(--pari-border) rounded-xl py-3 px-5 w-80 shrink-0 mx-2 shadow-sm dark:shadow-none transition-colors cursor-pointer hover:border-[#FF4500]/30"
    >
        <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
        >
            <i className={`${tool.icon} text-white text-[16px]`}></i>
        </div>
        <div className="min-w-0">
            <div className="text-[14px] font-semibold text-(--pari-text-primary) truncate">{tool.name}</div>
            <div className="text-[12px] text-(--pari-text-secondary) truncate">{tool.description}</div>
        </div>
    </div>
);

const row1 = [
    { iconClass: 'fa-solid fa-robot', text: 'AI Optimized Marketing' },
    { iconClass: 'fa-solid fa-crosshairs', text: 'Outcome First Models' },
    { iconClass: 'fa-solid fa-school', text: 'College & Campus Networks' },
    { iconClass: 'fa-solid fa-chart-line', text: 'Data Led Attribution' },
    { iconClass: 'fa-solid fa-globe', text: 'Pan India Distribution' },
    { iconClass: 'fa-solid fa-handshake', text: 'Influencer Ecosystems' },
];
const row2 = [
    { iconClass: 'fa-solid fa-money-bill-trend-up', text: 'Affiliate Commerce' },
    { iconClass: 'fa-solid fa-city', text: 'RWA & Community Networks' },
    { iconClass: 'fa-solid fa-mobile-screen', text: 'Digital Performance Stack' },
    { iconClass: 'fa-solid fa-location-dot', text: 'Offline Brand Activations' },
    { iconClass: 'fa-solid fa-link', text: 'ATL + BTL Correlation' },
    { iconClass: 'fa-solid fa-arrow-trend-up', text: 'Brand Adoption & Retention' },
];

const pillarCards = [
    {
        id: 'ai',
        tag: 'AI Powered',
        color: '#FF4500',
        heading: 'AI Optimized Marketing Infrastructure',
        desc: 'AI SEO, ORM, attribution models, and smart audience targeting engineered to drive bottom line metrics over mere impressions.',
        icon: 'fa-solid fa-microchip',
    },
    {
        id: 'influencer',
        tag: 'Influencers',
        color: '#FFB347',
        heading: 'Influencer & Affiliate Ecosystems',
        desc: 'Performance linked influencer networks and affiliate commerce stacks tied directly to sales and revenue outcomes.',
        icon: 'fa-solid fa-users-viewfinder',
    },
    {
        id: 'offline',
        tag: 'Offline',
        color: '#9999FE',
        heading: 'Offline & On Ground Distribution',
        desc: 'Direct access to exclusive community spaces like campuses, residential societies, and local events to reach highly engaged, trusting audiences.',
        icon: 'fa-solid fa-map-location-dot',
    },
    {
        id: 'data',
        tag: 'Data',
        color: '#81E4BA',
        heading: 'Outcome Mapped Analytics',
        desc: 'End to end data capture across offline and online consumer journeys, correlated to real business metrics.',
        icon: 'fa-solid fa-database',
    },
];

const PariHome = () => {
    const [order, setOrder] = useState(['ai', 'influencer', 'offline', 'data']);
    const [hovered, setHovered] = useState(null);
    const [tools, setTools] = useState([]);
    const [selectedTool, setSelectedTool] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder(prev => [...prev.slice(1), prev[0]]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getTools().then(setTools).catch(() => setTools([]));
    }, []);

    const getPosStyle = (id) => {
        const pos = order.indexOf(id);
        const yOffsets = [150, 75, 35, 0];
        const scales = [1, 0.96, 0.92, 0.88];
        const zIndexes = [40, 30, 20, 10];
        const hoverLift = (pos !== 0 && hovered === id) ? -12 : 0;
        return {
            zIndex: zIndexes[pos],
            transform: `translateY(${yOffsets[pos] + hoverLift}px) scale(${scales[pos]})`,
            transformOrigin: 'top center',
        };
    };

    const handleClick = (id) => {
        if (order.indexOf(id) === 0) return;
        setOrder(prev => [id, ...prev.filter(x => x !== id)]);
    };

    return (
        <div className="bg-(--pari-bg-primary) min-h-screen text-(--pari-text-primary) font-sans">
            <style>{marqueeCSS}</style>
            <DemoPopup />
            <PariNavbar />

            {/* ── HERO ────────────────────────────────────────── */}
            <div className="relative w-full min-h-screen pt-25 pb-20 flex flex-col items-center justify-center overflow-hidden">
                {/* Shader adapted for theme */}
                <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
                    <HeroBackground />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-215 px-6 mx-auto">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-(--pari-bg-secondary)/10 dark:bg-white/8 border border-(--pari-border) shadow-sm mb-10 transition-colors">
                        <span className="bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">New</span>
                        <span className="text-[13px] font-medium text-(--pari-text-secondary)">Pan India + Global Digital Reach →</span>
                    </div>

                    <h1 className="text-[64px] md:text-[80px] leading-none font-bold tracking-[-0.04em] text-(--pari-text-primary) mb-6 transition-colors">
                        Distribution,<br />
                        <em className="tracking-tight font-bold" style={{ fontFamily: 'Georgia, serif', color: '#FF4500', fontStyle: 'italic' }}>
                            engineered
                        </em>{' '}
                        for outcomes.
                    </h1>

                    <p className="text-[20px] leading-normal text-(--pari-text-secondary) max-w-140 mb-12 transition-colors">
                        We blend intelligent marketing, influencer networks, affiliate setups, and physical distribution to deliver clear and measurable results.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[16px] font-semibold rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30 flex items-center gap-2"
                        >
                            Partner With Us
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <a
                            href="#what-we-do"
                            className="px-8 py-4 bg-(--pari-bg-secondary)/10 dark:bg-white/8 text-(--pari-text-primary) text-[16px] font-medium rounded-[14px] hover:bg-(--pari-bg-secondary)/20 dark:hover:bg-white/15 transition-all border border-(--pari-border)"
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Stats strip */}
                    <div className="mt-16 flex flex-wrap justify-center gap-12 text-center">
                        {[
                            { val: '100+', label: 'Brands Enabled' },
                            { val: '300M+', label: 'Device & Community Touchpoints' },
                            { val: '₹120+ Cr', label: 'Aggregated Sales Driven' },
                        ].map((s) => (
                            <div key={s.val} className="flex flex-col items-center">
                                <span className="text-[36px] font-bold text-[#FF4500] leading-none">{s.val}</span>
                                <span className="text-[13px] text-(--pari-text-secondary) mt-2 font-medium">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── HOME LOGOS MARQUEE ──────────────────────────── */}
            <div className="w-full bg-(--pari-bg-primary) py-12 border-y border-(--pari-border) overflow-hidden relative transition-colors">
                <p className="text-center text-[13px] font-bold uppercase tracking-widest text-(--pari-text-secondary) mb-8">
                    Trusted by industry leaders
                </p>
                <div className="relative p-marquee flex overflow-hidden w-full max-w-300 mx-auto">
                    <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                    <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                    <div className="p-scroll-l items-center gap-10 px-5">
                        {[...topLogos, ...topLogos].map((logo, i) => (
                            <div key={i} className="flex items-center justify-center dark:bg-[#EDEBE6] dark:shadow-sm dark:shadow-black/40 rounded-xl border border-(--pari-border) p-4 h-20 min-w-35 transition-all duration-300 hover:shadow-md hover:-translate-y-1 mx-3">
                                <img src={logo} alt="Brand Logo" className="h-10 md:h-[50px] w-auto object-contain mix-blend-multiply" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── AI AGENTS & TOOLS ────────────────────────────── */}
            {tools.length > 0 && (
                <section className="py-24 bg-(--pari-bg-primary) border-t border-(--pari-border) transition-colors">
                    <div className="max-w-300 mx-auto px-6">
                        <div className="flex flex-col items-center text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">AI Agents & Tools</span>
                            <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight text-(--pari-text-primary) mb-4 transition-colors">
                                Intelligence built into every campaign
                            </h2>
                            <p className="text-[17px] text-(--pari-text-secondary) max-w-140 leading-relaxed transition-colors mb-8">
                                Custom AI agents and standalone tools that plug directly into your marketing stack — built around your brand, tracked back to real outcomes.
                            </p>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px] text-(--pari-text-secondary)">
                                {[
                                    { icon: 'fa-solid fa-bolt', text: 'Deployed in days, not months' },
                                    { icon: 'fa-solid fa-sliders', text: 'Tuned to your brand voice & data' },
                                    { icon: 'fa-solid fa-chart-line', text: 'Every result tied back to ROI' },
                                ].map((f) => (
                                    <span key={f.text} className="flex items-center gap-2 font-medium">
                                        <i className={`${f.icon} text-[#FF4500] text-[13px]`}></i>
                                        {f.text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative p-marquee flex overflow-hidden w-full max-w-300 mx-auto mb-10">
                            <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                            <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                            <div className="p-scroll-l">
                                {[...tools, ...tools].map((tool, i) => (
                                    <ToolCard
                                        key={`${tool.id}-${i}`}
                                        tool={tool}
                                        color={toolAccentColors[i % toolAccentColors.length]}
                                        onClick={() => setSelectedTool(tool)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Link
                                to="/ai-apps"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[16px] font-semibold rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                            >
                                Explore AI Agents & Tools
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <ToolBannerSlider tools={tools} onSelect={setSelectedTool} />

            {/* ── WHAT WE DO ──────────────────────────────────── */}
            <section id="what-we-do" className="py-32 px-6 bg-(--pari-bg-primary) relative transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="flex flex-col items-center text-center mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">
                            What We Do
                        </span>
                        <h2 className="text-[44px] md:text-[56px] font-bold tracking-tight leading-[1.1] text-(--pari-text-primary) mb-6 max-w-175 transition-colors">
                            Modern distribution built for{' '}
                            <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>real outcomes</em>
                        </h2>
                        <p className="text-[18px] text-(--pari-text-secondary) max-w-155 leading-relaxed transition-colors">
                            Parivestra is a growth infrastructure partner designed for brands focused on tangible results over vanity metrics. We unify advanced digital targeting, community networks, and robust offline channels.
                        </p>
                    </div>

                    {/* Thesis cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'fa-solid fa-earth-asia', title: 'Community First', desc: 'Every pathway we build centers around highly engaged consumer groups, spanning both digital and physical spaces.' },
                            { icon: 'fa-solid fa-chart-pie', title: 'Data Led', desc: 'Comprehensive behavioral tracking across journeys, effectively linked back to your core business indicators.' },
                            { icon: 'fa-solid fa-bullseye', title: 'Outcome Driven', desc: 'Our operational models tie directly to revenue growth, product adoption, and lasting market presence.' },
                        ].map((t) => (
                            <div key={t.title} className="bg-(--pari-bg-secondary)/50 dark:bg-white/4 border border-(--pari-border) rounded-2xl p-8 hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-white/7 transition-all hover:border-[#FF4500]/30 group shadow-sm dark:shadow-none">
                                <i className={`${t.icon} text-[40px] text-[#FF4500] mb-6 block transition-transform group-hover:scale-110 duration-300`}></i>
                                <h3 className="text-[20px] font-semibold text-(--pari-text-primary) mb-3 group-hover:text-[#FF4500] transition-colors">{t.title}</h3>
                                <p className="text-[15px] text-(--pari-text-secondary) leading-relaxed transition-colors">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT MAKES US DIFFERENT (Stacked Cards) ─────── */}
            <section className="py-20 px-4 bg-(--pari-bg-secondary) dark:bg-[#080F18] relative overflow-hidden transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">
                            What Makes Us Different
                        </span>
                        <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight leading-[1.1] text-(--pari-text-primary) mb-4 transition-colors">
                            Convergence of every<br />
                            <em style={{ fontFamily: 'Georgia, serif' }}>distribution</em> lever
                        </h2>
                        <p className="text-[17px] text-(--pari-text-secondary) max-w-120 transition-colors">Click a card to explore each pillar.</p>
                    </div>

                    <div className="relative w-full max-w-[950px] mx-auto h-150 md:h-170 flex justify-center mt-8">
                        {pillarCards.map((card) => {
                            const isFront = order.indexOf(card.id) === 0;
                            return (
                                <div
                                    key={card.id}
                                    className="absolute top-0 inset-x-0 mx-auto w-full max-w-[950px] min-h-125 bg-(--pari-bg-secondary) dark:bg-[#0F1E2F] rounded-3xl border border-(--pari-border) transition-all duration-500 ease-out cursor-pointer flex flex-col overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/40"
                                    style={getPosStyle(card.id)}
                                    onMouseEnter={() => setHovered(card.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={() => handleClick(card.id)}
                                >
                                    {/* Tab */}
                                    <div className="h-15 border-b border-(--pari-border) flex items-center px-8 gap-3 shrink-0">
                                        <div
                                            className="w-2.5 h-2.5 rounded-sm rotate-45 transition-opacity"
                                            style={{ backgroundColor: card.color, opacity: isFront || hovered === card.id ? 1 : 0.3 }}
                                        />
                                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border transition-all ${isFront ? 'text-(--pari-text-primary) border-(--pari-border) bg-(--pari-bg-primary)/40 dark:bg-white/10' : 'text-(--pari-text-secondary) border-transparent'}`}>
                                            {card.tag}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className={`flex flex-col lg:flex-row p-10 lg:p-14 gap-10 transition-opacity duration-500 h-full ${isFront ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                        <div className="flex-[0.9] pt-2">
                                            <i className={`${card.icon} text-[56px] text-[#FF4500] mb-8 block`}></i>
                                            <h3 className="text-[28px] lg:text-[36px] leading-[1.15] font-bold text-(--pari-text-primary) mb-5 tracking-tight max-w-95 transition-colors">
                                                {card.heading}
                                            </h3>
                                            <p className="text-[16px] text-(--pari-text-secondary) leading-[1.7] max-w-95 transition-colors">
                                                {card.desc}
                                            </p>
                                        </div>
                                        <div className="flex-[1.1] relative bg-(--pari-bg-primary)/40 dark:bg-white/3 border border-(--pari-border) rounded-2xl flex items-center justify-center min-h-55 overflow-hidden">
                                            <div className="text-center px-8">
                                                <i className={`${card.icon} text-[80px] text-(--pari-text-primary) opacity-20 mb-4 block`}></i>
                                                <div className="text-(--pari-text-secondary) text-[14px] transition-colors">{card.tag} Distribution</div>
                                            </div>
                                            <div className="absolute inset-0 rounded-2xl transition-opacity duration-700" style={{ background: `radial-gradient(ellipse at center, ${card.color}18 0%, transparent 70%)` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── MARQUEE SIGNALS ─────────────────────────────── */}
            <section className="py-24 bg-(--pari-bg-primary) border-t border-(--pari-border) transition-colors">
                <div className="max-w-360 mx-auto px-6">
                    <h3 className="text-[24px] text-(--pari-text-primary) font-semibold text-center mb-12 transition-colors">
                        Live across every distribution channel
                    </h3>

                    <div className="relative p-marquee flex flex-col gap-5 overflow-hidden w-full max-w-300 mx-auto">
                        <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                        <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-(--pari-bg-primary) to-transparent z-10 pointer-events-none transition-all" />
                        <div className="p-scroll-l">{[...row1, ...row1, ...row1].map((p, i) => <Pill key={i} {...p} />)}</div>
                        <div className="p-scroll-r">{[...row2, ...row2, ...row2].map((p, i) => <Pill key={i} {...p} />)}</div>
                    </div>
                </div>
            </section>

            {/* ── MARKETS & COVERAGE ──────────────────────────── */}
            <section className="py-32 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">Markets & Coverage</span>
                        <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight text-(--pari-text-primary) mb-4 transition-colors">Where we operate</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* India */}
                        <div className="bg-linear-to-br from-[#FF4500]/10 to-transparent border border-[#FF4500]/20 rounded-2xl p-8 hover:border-[#FF4500]/40 transition-all shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-4 mb-6">
                                <i className="fa-solid fa-mountain-city text-[32px] text-[#FF4500]"></i>
                                <div>
                                    <h3 className="text-[22px] font-bold text-(--pari-text-primary) transition-colors">India</h3>
                                    <p className="text-[#FF4500] text-[13px] font-semibold uppercase tracking-wide">Pan India • Offline First</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Colleges', 'RWAs', 'Turfs', 'Communities', 'On Ground Networks', 'Events'].map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-(--pari-bg-primary)/60 dark:bg-white/8 border border-(--pari-border) rounded-lg text-[13px] text-(--pari-text-secondary) font-medium transition-colors">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Global */}
                        <div className="bg-linear-to-br from-[#9999FE]/10 to-transparent border border-[#9999FE]/20 rounded-2xl p-8 hover:border-[#9999FE]/40 transition-all shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-4 mb-6">
                                <i className="fa-solid fa-earth-americas text-[32px] text-[#9999FE]"></i>
                                <div>
                                    <h3 className="text-[22px] font-bold text-(--pari-text-primary) transition-colors">Global Digital</h3>
                                    <p className="text-[#9999FE] text-[13px] font-semibold uppercase tracking-wide">US • UAE • ASEAN • Australia</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Performance Marketing', 'Affiliate Networks', 'Influencer Stacks', 'AI Led Marketing'].map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-(--pari-bg-primary)/60 dark:bg-white/8 border border-(--pari-border) rounded-lg text-[13px] text-(--pari-text-secondary) font-medium transition-colors">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── KEY STRENGTHS ───────────────────────────────── */}
            <section className="py-32 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-300 mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6 transition-colors">Key Strengths</span>
                        <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">Why brands choose Parivestra</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { icon: 'fa-solid fa-chart-line', title: 'Brand Visibility → Sales', desc: 'Direct correlation of brand visibility with actual sales outcomes.' },
                            { icon: 'fa-solid fa-share-nodes', title: 'Omnichannel Data Capture', desc: 'Unified data across offline and online consumer journeys.' },
                            { icon: 'fa-solid fa-building-shield', title: 'Proprietary Channels', desc: 'Access to non biddable, high trust distribution inventories.' },
                            { icon: 'fa-solid fa-bolt-lightning', title: 'Speed & Scalability', desc: 'Rapid deployment with measurable accountability at every stage.' },
                            { icon: 'fa-solid fa-bullseye', title: 'ATL + BTL Correlation', desc: 'True above-the-line and below-the-line performance mapping.' },
                            { icon: 'fa-solid fa-handshake-angle', title: 'Hybrid Execution', desc: 'Strong omnichannel and hybrid campaign execution capabilities.' },
                        ].map((s) => (
                            <div key={s.title} className="bg-(--pari-bg-secondary)/50 dark:bg-white/3 border border-(--pari-border) rounded-2xl p-6 hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-white/6 hover:border-[#FF4500]/25 transition-all group shadow-sm dark:shadow-none">
                                <i className={`${s.icon} text-[32px] text-[#FF4500] mb-4 block group-hover:scale-110 transition-transform`}></i>
                                <h3 className="text-[17px] font-semibold text-(--pari-text-primary) mb-2 group-hover:text-[#FF4500] transition-colors">{s.title}</h3>
                                <p className="text-[14px] text-(--pari-text-secondary) leading-relaxed transition-colors">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PariFooter />

            <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        </div>
    );
};

export default PariHome;
