import React from 'react';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';

// Import local logos
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
import heroLogo from '../assets/hero.png';
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

const brands = [
    { name: 'Amazon', logo: amazonLogo, sector: 'E-Commerce' },
    { name: 'Uber', logo: uberLogo, sector: 'Mobility' },
    { name: 'Swiggy', logo: swiggyLogo, sector: 'Food Delivery' },
    { name: 'Paytm', logo: paytmLogo, sector: 'Fintech' },
    { name: 'RedBull', logo: redbullLogo, sector: 'Beverage' },
    { name: 'Nestlé', logo: nestleLogo, sector: 'FMCG' },
    { name: 'Pizza Hut', logo: pizzahutLogo, sector: 'QSR' },
    { name: 'Budweiser', logo: budweiserLogo, sector: 'Beverage' },
    { name: 'Gillette', logo: gilletteLogo, sector: 'Personal Care' },
    { name: 'Hershey\'s', logo: hersheysLogo, sector: 'Confectionery' },
    { name: 'Nescafé', logo: nescafeLogo, sector: 'Beverage' },
    { name: 'Reliance', logo: relianceLogo, sector: 'Conglomerate' },
    { name: 'Myntra', logo: myntraLogo, sector: 'Fashion E-Commerce' },
    { name: 'Meesho', logo: meeshoLogo, sector: 'Social Commerce' },
    { name: 'NDTV', logo: ndtvLogo, sector: 'Media & News' },
    { name: 'India Today', logo: indiatodayLogo, sector: 'Media' },
    { name: 'Hindustan Times', logo: hindustantimesLogo, sector: 'Media' },
    { name: 'Tata WPL', logo: tataLogo, sector: 'Sports & Conglomerate' },
    { name: 'Apollo', logo: apolloLogo, sector: 'Healthcare' },
    { name: 'Wow! Momo', logo: wowmomoLogo, sector: 'QSR' },
    { name: 'IDP', logo: idpLogo, sector: 'Education' },
    { name: 'FixDerma', logo: fixdermaLogo, sector: 'Skincare' },
    { name: 'Fast&Up', logo: fastupLogo, sector: 'Nutrition' },
    { name: 'Hangyo', logo: hangyoLogo, sector: 'Ice Cream' },
    { name: 'Admitad', logo: admitadLogo, sector: 'Affiliate Marketing' },
    { name: 'Aptos', logo: aptosLogo, sector: 'Blockchain' },
    { name: 'RiseIn', logo: riseinLogo, sector: 'Web3 Academy' },
    { name: 'StockPe', logo: stockpeLogo, sector: 'Fintech' },
    { name: 'OHI', logo: ohiLogo, sector: 'Advertising' },
    { name: 'Excellent Publicity', logo: excellentLogo, sector: 'Advertising' },
    { name: 'FlixBus', logo: flixbusLogo, sector: 'Intercity Travel' },
];

const PariClientele = () => {
    return (
        <div className="bg-[var(--pari-bg-primary)] min-h-screen text-[var(--pari-text-primary)] font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-[760px] mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8 transition-colors">Clientele</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-[1.0] text-[var(--pari-text-primary)] mb-6 transition-colors">
                        Brands we've{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>worked with</em>
                    </h1>
                    <p className="text-[19px] text-[var(--pari-text-secondary)] leading-relaxed transition-colors">
                        We build nationwide campaigns tailored to distinct regional markets, leveraging a robust offline and online presence.
                    </p>
                </div>
            </section>

            {/* ── BRAND GRID (Premium Collage) ──────────────── */}
            <section className="py-24 px-4 sm:px-6 bg-[var(--pari-bg-secondary)] dark:bg-[#080F18] transition-colors relative overflow-hidden">
                {/* Decorative background blur to make it feel rich */}
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#FF4500]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#FF6B35]/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                        {brands.map((brand) => (
                            <div
                                key={brand.name}
                                className="group relative flex flex-col items-center justify-center h-[180px] dark:bg-[#EDEBE6] dark:shadow-sm dark:shadow-black/40 border border-[var(--pari-border)] hover:border-[#FF4500]/50 rounded-[28px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,69,0,0.15)] hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Dark Gradient Overlay on Hover for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                                {/* Full Tile Logo Plate */}
                                <div className="absolute inset-0 z-0 p-8 flex items-center justify-center group-hover:scale-[0.85] group-hover:-translate-y-3 transition-all duration-500">
                                    <img
                                        src={brand.logo}
                                        alt={`${brand.name} Logo`}
                                        className="w-full h-full object-contain mix-blend-multiply grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>

                                {/* Sliding Text Details */}
                                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col items-center text-center">
                                    <h3 className="text-[17px] font-bold text-white leading-tight drop-shadow-md">{brand.name}</h3>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF4500] mt-1 drop-shadow-md">{brand.sector}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 1: PARIVESTRA OFFLINE CAPABILITIES ── */}
            <section className="py-24 px-6 bg-[#0B1120] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[700px]">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF4500]/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-[500px] relative z-10 lg:ml-[5%] mb-16 lg:mb-0">
                    <h2 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-4">
                        Parivestra Offline<br />Capabilities
                    </h2>
                    <p className="text-[#FF4500] text-[22px] font-bold mb-10">Community driven Offline Capabilities</p>
                    <div className="flex flex-wrap gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10 w-fit">
                        <div className="bg-white/90 p-2 rounded-lg flex items-center justify-center h-10 w-24">
                            <img src={aptosLogo} className="h-full w-full object-contain mix-blend-multiply" alt="Aptos" />
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg flex items-center justify-center h-10 w-24">
                            <img src={riseinLogo} className="h-full w-full object-contain mix-blend-multiply" alt="Rise In" />
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg flex items-center justify-center h-10 w-24">
                            <img src={redbullLogo} className="h-full w-full object-contain mix-blend-multiply" alt="Red Bull" />
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg flex items-center justify-center h-10 w-24">
                            <img src={ndtvLogo} className="h-full w-full object-contain mix-blend-multiply" alt="NDTV" />
                        </div>
                    </div>
                    <div className="flex items-center gap-16 mt-16 font-medium">
                        <div>
                            <p className="text-[#FF4500] text-sm">Phone</p>
                            <p className="text-white">+91 7970476060</p>
                        </div>
                        <div>
                            <p className="text-[#FF4500] text-sm">Website</p>
                            <p className="text-white">www.parivestra.com</p>
                        </div>
                    </div>
                </div>

                {/* Overlapping Circles mapped roughly to the diagram */}
                <div className="relative w-full max-w-[650px] h-[550px] z-10 hidden sm:block shrink-0 mx-auto lg:mx-0">
                    {[
                        { top: '0%', left: '15%', size: '160px', val: '5000+', label: 'College Partners' },
                        { top: '5%', left: '50%', size: '140px', val: '2.4M+', label: 'Strong Web3 Community' },
                        { top: '15%', left: '75%', size: '130px', val: '70+', label: 'Channel Partners' },
                        { top: '30%', left: '25%', size: '170px', val: '6000+', label: 'Influencers' },
                        { top: '35%', left: '50%', size: '180px', val: '100M+', label: 'Social Media Reach' },
                        { top: '40%', left: '80%', size: '140px', val: '1M+', label: 'Developer Community' },
                        { top: '55%', left: '2%', size: '230px', val: '15+', label: 'Social Channels to endorse chains', highlight: true },
                        { top: '65%', left: '42%', size: '160px', val: 'Top 3 trending', label: 'on X Guaranteed' },
                        { top: '55%', left: '70%', size: '220px', val: '170M+', label: 'Online Community' },
                    ].map((circ, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-full flex flex-col items-center justify-center text-center shadow-xl transition-transform hover:scale-105 border border-white/10 ${circ.highlight ? 'bg-gradient-to-br from-[#8B0000] to-[#4A0000] z-20 border-[#9333ea]' : 'bg-gradient-to-br from-[#6B1B1B] to-[#3B0B0B]/80 z-10 mix-blend-screen opacity-90'}`}
                            style={{ top: circ.top, left: circ.left, width: circ.size, height: circ.size, padding: '10px' }}
                        >
                            <span className="text-white font-bold text-[18px] mb-1">{circ.val}</span>
                            <span className="text-white/80 text-[12px] leading-tight px-2">{circ.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 2: THE PROBLEM ── */}
            <section className="py-24 px-6 bg-[#111827] text-center relative overflow-hidden">
                <h2 className="text-[36px] md:text-[44px] font-bold text-white mb-2 font-sans tracking-tight">
                    THE PROBLEM MOST BRANDS FACE TODAY...
                </h2>
                <p className="text-[17px] text-white/70 italic mb-16 max-w-[800px] mx-auto">
                    Despite high spends on Google and Meta ads & influencer partnerships, most brands struggle with:
                </p>

                <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto mb-16">
                    {[
                        { title: 'Low retention among Gen Z users and lack of any positive Word-of-Mouth', icon: 'fa-solid fa-users-slash', color: 'border-white' },
                        { title: 'Lack of authentic reviews or UGC on Play Store/App Store', icon: 'fa-solid fa-mobile-screen', color: 'border-[#991B1B]' },
                        { title: 'Lack of any organic community to grow the app', icon: 'fa-solid fa-bullseye', color: 'border-white' },
                        { title: 'Poor on-ground visibility beyond digital campaigns', icon: 'fa-solid fa-map-location-dot', color: 'border-[#991B1B]' },
                        { title: 'No community-led momentum — users download, but don\'t endorse', icon: 'fa-solid fa-comments', color: 'border-white' }
                    ].map((card, i) => (
                        <div key={i} className={`bg-white rounded-2xl w-full sm:w-[220px] p-6 shadow-xl flex flex-col items-center border-t-[8px] ${card.color} ${card.color === 'border-[#991B1B]' ? 'bg-[#991B1B]/10' : ''}`}>
                            <i className={`${card.icon} text-4xl mb-5 ${card.color === 'border-[#991B1B]' ? 'text-white' : 'text-[#333]'}`}></i>
                            <p className={`text-[14px] font-bold text-center ${card.color === 'border-[#991B1B]' ? 'text-white' : 'text-[#222]'}`}>{card.title}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-[1000px] mx-auto relative mt-20">
                    {/* Fake divider line */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#991B1B] -mt-10" />

                    <div className="bg-[#1A2234] border border-white/5 rounded-2xl p-8 pb-16 z-10 relative shadow-2xl">
                        <h3 className="text-[26px] font-bold text-white mb-8">The Missed Opportunity: India's College Ecosystem</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                                <i className="fa-solid fa-people-group text-3xl text-white/40"></i>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                                <i className="fa-solid fa-person-running text-3xl text-white/40"></i>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                                <img src={hangyoLogo} alt="Hangyo" className="w-16 h-auto opacity-50 grayscale" />
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                                <i className="fa-solid fa-hands-clapping text-3xl text-white/40"></i>
                            </div>
                        </div>
                    </div>

                    <div className="inline-block px-8 py-5 bg-[#FF4500] rounded-full text-white font-bold text-[20px] shadow-2xl relative z-20 -mt-12 border-[6px] border-[#111827]">
                        Your next 1M+ loyal users are in college campuses.<br />
                        <span className="text-[14px] font-normal tracking-wide">And they're ready to download, review, post, and promote — if you show up the right way.</span>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: DISTRIBUTION ENGINE ── */}
            <section className="py-24 px-6 bg-[#0B1120] text-center border-t border-white/10">
                <div className="flex items-center justify-center mb-6">
                    <img src={heroLogo} alt="Logo" className="h-8 invert opacity-50" />
                </div>
                <h2 className="text-[32px] md:text-[44px] font-bold text-white uppercase tracking-tight mb-4 leading-tight">
                    THE DISTRIBUTION ENGINE BEHIND<br />EVERY CAMPAIGN
                </h2>
                <p className="text-white/80 italic max-w-[800px] mx-auto mb-20 text-[18px]">
                    Your campaigns are designed to drive both topline installs and bottomline reputation.<br />
                    Our influencer, college, and digital community network powers every growth KPI.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
                    {[
                        { val: '10,000+', label: 'Influencer Community', text: 'across platforms like Instagram, Youtube, X, Linkedin & more in all niches like education, finance, technology etc.' },
                        { val: '170M+', label: 'Online Community', text: 'across Social media platforms & niche groups that have been built on the basis of data from our campaigns over the last 5 years.' },
                        { val: '1000+', label: 'College Community pan-India', text: 'that we leverage to fulfill your recruitment needs & fill your recruitment pipeline with the best talent across India.' },
                    ].map((col, i) => (
                        <div key={i} className="flex flex-col items-center">
                            {/* Shiny Red Orb */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6B0000] via-[#FF0000] to-[#FF8888] shadow-[0_0_30px_rgba(255,0,0,0.4)] mb-8 flex items-center justify-center border border-white/40 relative overflow-hidden">
                                <div className="absolute top-1 left-2 w-4 h-4 bg-white/40 rounded-full blur-[2px]"></div>
                            </div>

                            <h3 className="text-[32px] font-bold text-white mb-1">{col.val}</h3>
                            <h4 className="text-[20px] font-semibold text-white mb-8">{col.label}</h4>

                            <div className="bg-transparent border border-white/30 p-6 w-full text-left rounded-lg min-h-[160px] flex items-center">
                                <p className="text-white/90 text-[16px] leading-[1.6]">{col.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 4: OFFLINE SERVICE CAPABILITIES ── */}
            <section className="py-24 px-6 bg-[#080C17] border-t border-white/5 relative">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-[36px] md:text-[52px] font-bold text-white tracking-tight">Offline Service Capabilities</h2>
                            <i className="fa-solid fa-circle-arrow-right text-[36px] text-white/50"></i>
                        </div>
                        <p className="text-[#FF4500] font-bold text-[20px] tracking-wide">Tailored Offline Activation, Fueled by Community</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Timeline */}
                        <div className="flex-1 relative bg-[#0B1120] p-10 rounded-3xl border border-white/5 shadow-2xl">
                            <div className="absolute left-[39px] top-[40px] bottom-[40px] w-1.5 bg-white/10 rounded-full"></div>

                            <div className="space-y-14 relative z-10">
                                {[
                                    {
                                        title: 'On-Campus Branding & ATL Activations',
                                        points: ['Large-format banners, posters, and creative installations for high recall.', 'QR codes, flyers, and digital boards for interactive engagement.'],
                                        dot: 'red'
                                    },
                                    {
                                        title: 'College Events & Experiential Activations',
                                        points: ['High-impact flash mobs, pop-ups, booths, kiosks, screenings, and fest integrations.', 'Sponsorships with college fests, events, and clubs, including experiential setups that resonate with student communities.'],
                                        dot: 'white'
                                    },
                                    {
                                        title: 'Campus Ambassadors & P2P Advocacy',
                                        points: ['Peer-led word-of-mouth, WhatsApp groups, UGC loops, and community-driven PR.', 'Custom KPIs like registrations, downloads, views, reviews, and sentiment shaping through grassroots advocacy.'],
                                        dot: 'red'
                                    },
                                    {
                                        title: 'Product Placement & Retail Partnerships',
                                        points: ['Strategic placement in high-footfall locations like campus canteens, cafes, retail outlets, turfs, bus stands, and corporate offices.', '2000+ college partnerships pan-India, ensuring direct student reach and high-frequency brand interactions.'],
                                        dot: 'red'
                                    },
                                    {
                                        title: 'College Activations & Product Sampling',
                                        points: ['Dry and wet sampling through kiosks, pop-ups, and live product trials.', 'Across colleges, gyms, cafes, fitness studios, and retail locations.', 'Builds brand trust through real-world interactions and immediate feedback.'],
                                        dot: 'white'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-14">
                                        {/* Dot */}
                                        <div className={`absolute -left-[5px] top-1 w-8 h-8 rounded-full border-[3px] border-white/20 flex items-center justify-center shadow-lg ${item.dot === 'red' ? 'bg-gradient-to-tr from-[#6B0000] to-[#FF4500]' : 'bg-gradient-to-tr from-gray-300 to-white'}`}>
                                            <div className="absolute top-1 left-1.5 w-2 h-2 bg-white/60 rounded-full blur-[1px]"></div>
                                        </div>
                                        <h3 className="text-[#FF4500] text-[22px] font-bold mb-4 tracking-wide">{item.title}</h3>
                                        <ul className="space-y-4">
                                            {item.points.map((pt, j) => (
                                                <li key={j} className="text-white/80 text-[15px] leading-relaxed relative before:content-['•'] before:absolute before:-left-5 before:text-[#FF4500]">
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Success Stories block */}
                        <div className="flex-1 flex flex-col pt-10">
                            <h3 className="text-white text-[28px] font-bold mb-8 text-center font-sans tracking-tight">Success Stories</h3>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 gap-8 grid grid-cols-2 shadow-2xl h-full content-start">
                                {[indiatodayLogo, wowmomoLogo, hindustantimesLogo, tataLogo, meeshoLogo, fixdermaLogo, amazonLogo, budweiserLogo, fastupLogo, hersheysLogo].map((logo, idx) => (
                                    <div key={idx} className="flex items-center justify-center bg-[#EDEBE6] p-4 rounded-xl aspect-[3/2] shadow-lg shadow-black/30 hover:scale-105 transition-transform duration-300">
                                        <img src={logo} className="w-full h-full object-contain mix-blend-multiply" alt="Partner Logo" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: PARTNERS WHO TRUST OUR CAMPAIGNS ── */}
            <section className="py-24 px-6 bg-[#0B1120] relative">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-[0.8] text-center md:text-left">
                        <h2 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-8">
                            Partners who<br />trust our<br /><span className="text-[#FF4500]">campaigns</span>
                        </h2>
                        <p className="text-[20px] text-white/90 leading-relaxed font-medium">
                            We are currently working with more than <span className="text-[#FF4500] font-bold">50 companies</span> across <span className="text-[#FF4500] font-bold">7 industries</span> and <span className="text-[#FF4500] font-bold">11+ countries.</span>
                        </p>
                    </div>

                    <div className="flex-[1.2] w-full bg-[#1A2234] rounded-3xl p-8 md:p-12 border border-white/5 relative shadow-2xl">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 items-center justify-items-center w-full">
                            {[aptosLogo, riseinLogo, swiggyLogo, hangyoLogo, relianceLogo, paytmLogo, meeshoLogo, ohiLogo, redbullLogo, wowmomoLogo, idpLogo, stockpeLogo, pizzahutLogo, admitadLogo, excellentLogo, nescafeLogo, fixdermaLogo, indiatodayLogo, amazonLogo, hindustantimesLogo, tataLogo, budweiserLogo, gilletteLogo, hersheysLogo, ndtvLogo, fastupLogo].map((logo, idx) => (
                                <div key={idx} className="bg-[#EDEBE6] rounded-xl shadow-md shadow-black/30 border border-black/5 flex items-center justify-center p-3 h-16 w-full max-w-[140px] hover:scale-105 transition-transform duration-300">
                                    <img src={logo} className="w-full h-full object-contain mix-blend-multiply" alt="Partner Logo" />
                                </div>
                            ))}
                        </div>
                        <p className="text-right text-white/50 text-[12px] mt-10 pt-4 border-t border-white/5">www.parivestra.com</p>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: CASE STUDY ── */}
            <section className="py-24 px-6 bg-[#080C17] border-t border-white/5 overflow-hidden">
                <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
                    {/* Image side */}
                    <div className="flex-1 w-full relative">
                        <img src={fastupLogo} className="h-16 mb-8 object-contain" alt="Fast&Up" />
                        <div className="bg-[#115E59]/20 p-6 rounded-2xl border border-[#115E59]/40 flex justify-center shadow-2xl">
                            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#004270] to-[#002f52] rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner">
                                <div className="text-white font-bold text-center p-6 mix-blend-screen opacity-90">
                                    <h4 className="text-[32px] sm:text-[40px] italic tracking-tight font-black leading-[1.1] mb-6">WHY INDIA<br />TRUSTS <span className="text-[#FFD700]">RELOAD?</span></h4>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                                            <i className="fa-solid fa-check text-green-500 text-2xl"></i>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold">Tested in the UK</span>
                                        <div className="bg-red-600 px-3 py-1 font-bold text-[12px] rounded uppercase mt-2">Swiss Formulation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-[1.2] relative lg:pl-12 lg:border-l-[4px] border-[#FFD700]/40 rounded-l-3xl">
                        <h2 className="text-[42px] md:text-[56px] font-bold text-white mb-2 tracking-tight">Fast&Up Reload</h2>
                        <h3 className="text-[20px] md:text-[22px] text-white/90 mb-4 font-medium">Fast&Up Reload (Electrolyte Hydration Drink)</h3>
                        <h4 className="text-[18px] md:text-[20px] text-white/80 mb-10 pb-4 border-b border-white/10">Sampling</h4>

                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="w-4 h-4 rounded-full mt-1.5 shrink-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <p className="text-white/90 text-[16px]"><span className="font-bold text-white">Campaign Duration:</span> 3 Months (Peak summer activation)</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-4 h-4 rounded-full mt-1.5 shrink-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <p className="text-white/90 text-[16px]"><span className="font-bold text-white">Sales Volume:</span> 25,000 bottles distributed</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-4 h-4 rounded-full mt-1.5 shrink-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <p className="text-white/90 text-[16px]"><span className="font-bold text-white">Target Audience:</span> Athletes, fitness enthusiasts, college students, young professionals (ages 18–35)</p>
                            </div>

                            <div className="flex gap-4 pt-4 relative">
                                <div className="absolute left-[-24px] top-6 bottom-0 w-px bg-white/10 hidden md:block"></div>
                                <div className="w-4 h-4 rounded-full mt-1.5 shrink-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <div className="bg-[#111827] rounded-xl p-5 border border-white/5 w-full">
                                    <p className="text-white text-[16px] font-bold mb-3">Activation Model:</p>
                                    <p className="text-white/80 text-[15px] mb-2"><span className="mr-2">🏋️</span> Strategic placements and activations at gyms, marathons, yoga studios, sports events, colleges and railway stations</p>
                                    <p className="text-white/80 text-[15px]"><span className="mr-2">🎓</span> Campus activations with targeted sessions for student athletes & fitness communities</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <div className="w-4 h-4 rounded-full mt-1.5 shrink-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                                <div className="bg-[#111827] rounded-xl p-5 border border-white/5 w-full">
                                    <p className="text-white text-[16px] font-bold mb-3">Outcomes Achieved:</p>
                                    <p className="text-white/80 text-[15px] mb-2"><span className="mr-2">🚀</span> Significant boost in brand recall and trial among fitness-oriented communities</p>
                                    <p className="text-white/80 text-[15px] mb-2"><span className="mr-2">💬</span> Increased online visibility via authentic reviews and testimonials</p>
                                    <p className="text-yellow-400 text-[15px] mt-4 pt-4 border-t border-white/10 font-medium"><span className="mr-2">🌟</span> More than 10,000 new repeat customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: CONTACT / HAVE A QUESTION ── */}
            <section className="py-24 px-6 bg-[#0B1120] relative border-t border-white/5 overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-[500px] bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />

                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-16 relative z-10">
                    <div className="flex-[0.8] text-center md:text-left">
                        <img src={heroLogo} className="h-10 mb-12 mx-auto md:mx-0 invert opacity-90" alt="Parivestra Ventures" />
                        <h2 className="text-[64px] lg:text-[80px] font-bold text-white leading-[1.0] tracking-tight mb-8">
                            Have a<br />Question?
                        </h2>
                        <a href="/contact" className="text-white text-[24px] font-bold hover:text-[#FF4500] transition-colors ml-2 flex items-center justify-center md:justify-start gap-3">
                            Book a call
                            <i className="fa-solid fa-arrow-right text-[20px]"></i>
                        </a>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 mt-10 md:mt-16 w-full max-w-[600px]">
                        <div>
                            <div className="bg-white rounded-full px-6 py-2 inline-block text-[#0B1120] font-bold text-[14px] mb-5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">Phone</div>
                            <p className="text-white/90 text-[16px] mb-1.5 font-medium">+91 7970476060</p>
                            <p className="text-white/90 text-[16px] font-medium">+91 9810724827</p>
                        </div>
                        <div>
                            <div className="bg-white rounded-full px-6 py-2 inline-block text-[#0B1120] font-bold text-[14px] mb-5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">Email</div>
                            <p className="text-white/90 text-[16px] font-medium">ayush@parivestra.com</p>
                        </div>
                        <div>
                            <div className="bg-white rounded-full px-6 py-2 inline-block text-[#0B1120] font-bold text-[14px] mb-5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">Link</div>
                            <div className="space-y-2">
                                <a href="https://www.parivestra.com" target="_blank" rel="noreferrer" className="block text-white/90 text-[16px] hover:text-[#FF4500] transition-colors"><span className="underline decoration-white/30 underline-offset-4">www.parivestra.com</span></a>
                                <a href="https://calendly.com" target="_blank" rel="noreferrer" className="block text-white text-[16px] hover:text-[#FF4500] transition-colors"><span className="underline decoration-white/30 underline-offset-4 font-bold">Calendly-Ayush</span></a>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white rounded-full px-6 py-2 inline-block text-[#0B1120] font-bold text-[14px] mb-5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">Address</div>
                            <p className="text-white/90 text-[16px] leading-[1.6] font-medium">S-23/1, Phase 3,<br />Gurugram- 122010, India.</p>
                        </div>
                    </div>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariClientele;
