import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FestiveHeader from '../components/festive/FestiveHeader';
import { BookNowModal, ContactModal, HeroBookForm } from '../components/festive/FestiveModals';
import PariFooter from './PariFooter';
import Counter from '../components/ui/Counter';
import ScrollReveal from '../components/ScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import {
    IconArrow, IconArrowUpRight, IconCheck,
    IconDigital, IconRetail, IconCommunities, IconCreators, IconData, IconAI, IconOffline,
} from '../components/ui/icons';
import {
    heroCopy, stats, ecosystemNodes, channelCards, objectives, whyPoints, trustedBrands, trustedSub, caseStudies,
} from '../content/festiveReachContent';
import '../styles/festive.css';

// "icon" marks already carry their own brand-colour background (app-icon style) and are
// shown as-is with no wrapper. "mark" logos are plain wordmarks with a transparent
// background — these keep their intended white card instead of being forced onto a
// colour tile, which would make a same-hue wordmark (e.g. red-on-red) disappear.
import swiggyIcon from '../assets/swiggy_icon.png';
import googleIcon from '../assets/google_icon.png';
import zomatoIcon from '../assets/zomato_icon.png';
import phonepeLogo from '../assets/phonepe.png';
import ixigoLogo from '../assets/ixigo.png';
import blinkitLogo from '../assets/blinkit.png';
import jiosaavnLogo from '../assets/jiosaavn.png';

import paytmMark from '../assets/paytm_vec.png';
import makemytripMark from '../assets/makemytrip.png';
import goibiboMark from '../assets/goibibo.png';
import redbusMark from '../assets/redbus.png';
import tata1mgMark from '../assets/tata1mg.png';

const trustedLogos = {
    Swiggy: { src: swiggyIcon, kind: 'icon' },
    Google: { src: googleIcon, kind: 'icon' },
    Zomato: { src: zomatoIcon, kind: 'icon' },
    PhonePe: { src: phonepeLogo, kind: 'icon' },
    ixigo: { src: ixigoLogo, kind: 'icon' },
    Blinkit: { src: blinkitLogo, kind: 'icon' },
    JioSaavn: { src: jiosaavnLogo, kind: 'mark' },
    Paytm: { src: paytmMark, kind: 'mark' },
    MakeMyTrip: { src: makemytripMark, kind: 'mark' },
    Goibibo: { src: goibiboMark, kind: 'mark' },
    redBus: { src: redbusMark, kind: 'mark' },
    'Tata 1mg': { src: tata1mgMark, kind: 'mark' },
};

const iconMap = { digital: IconDigital, retail: IconRetail, communities: IconCommunities, creators: IconCreators, data: IconData, ai: IconAI, offline: IconOffline };

const TrustLogo = ({ brand, size = 'md' }) => {
    const logo = trustedLogos[brand];
    const h = size === 'sm' ? 'h-12' : 'h-16';
    if (logo.kind === 'icon') {
        return <img src={logo.src} alt={brand} className={`${h} w-auto shrink-0 rounded-xl object-contain`} />;
    }
    return (
        <span className={`flex ${h} shrink-0 items-center justify-center rounded-xl bg-white px-5`}>
            <img src={logo.src} alt={brand} className={size === 'sm' ? 'h-5 w-auto object-contain' : 'h-6 w-auto object-contain'} />
        </span>
    );
};

const Wrap = ({ children, className = '' }) => <div className={`relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;

const Glow = ({ className = '', drift = true, delay = 0 }) => (
    <div aria-hidden="true" style={{ animationDelay: `${delay}s` }} className={`pointer-events-none absolute rounded-full bg-amber/20 blur-[110px] ${drift ? 'festive-glow-drift' : 'animate-none'} ${className}`} />
);

// Card surface shared by every card group on the page — glass panel that lifts and
// gains an amber glow on hover, instead of the flat border-colour-only treatment.
const cardCls = 'transition-all duration-400 ease-out hover:-translate-y-1.5 hover:border-amber/40 hover:shadow-[0_28px_70px_-28px_rgba(216,138,67,0.45)]';

const PrimaryBtn = ({ onClick, children, className = '', onLight = false }) => (
    <button type="button" onClick={onClick} className={`group inline-flex h-14 items-center gap-4 rounded-full bg-amber pl-7 pr-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors ${onLight ? 'hover:bg-ink hover:text-bone' : 'hover:bg-bone'} ${className}`}>
        {children}
        <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-ink/15 transition-transform duration-300 group-hover:translate-x-0.5 ${onLight ? 'group-hover:bg-bone/15' : ''}`}><IconArrow size={15} /></span>
    </button>
);

const GhostBtn = ({ onClick, children, className = '' }) => (
    <button type="button" onClick={onClick} className={`inline-flex h-14 items-center rounded-full border border-bone/20 px-7 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:border-amber hover:text-amber ${className}`}>
        {children}
    </button>
);

// Hub-and-spoke distribution visual — reused (at two sizes) for the hero and the
// "one ecosystem" section so the page explains itself visually instead of in prose.
const EcosystemGraphic = ({ compact = false }) => {
    const n = ecosystemNodes.length;
    const positioned = ecosystemNodes.map((node, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const r = 42;
        return { ...node, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
    });

    const ringMask = 'radial-gradient(circle, transparent calc(50% - 1.5px), #000 calc(50% - 1.5px), #000 50%, transparent calc(50% + 1.5px))';

    return (
        <div className={`relative mx-auto aspect-square w-full ${compact ? 'max-w-[380px] sm:max-w-[460px]' : 'max-w-[620px]'}`}>
            {/* Radar-style scan rings — a bright arc sweeps around each orbit track, one
                of the node ring (where the channel icons sit) and one just outside it. */}
            <div
                aria-hidden="true"
                className="festive-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: '84%', height: '84%',
                    background: 'conic-gradient(from 0deg, transparent 0%, transparent 87%, rgba(216,138,67,0.9) 97%, transparent 100%)',
                    WebkitMaskImage: ringMask, maskImage: ringMask,
                }}
            />
            <div
                aria-hidden="true"
                className="festive-orbit-rev absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: '98%', height: '98%',
                    background: 'conic-gradient(from 90deg, transparent 0%, transparent 92%, rgba(216,138,67,0.5) 98%, transparent 100%)',
                    WebkitMaskImage: ringMask, maskImage: ringMask,
                }}
            />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {positioned.map((node) => (
                    <line
                        key={node.key}
                        x1="50" y1="50" x2={node.x} y2={node.y}
                        stroke="rgba(216,138,67,0.35)" strokeWidth="0.3" strokeDasharray="1.4 1.6"
                        className="dash-flow"
                    />
                ))}
                {/* Data travelling outward from the hub to each channel — the page's one
                    distinctive motion idea, standing in for "distribution" itself. */}
                {positioned.map((node, i) => (
                    <circle key={`${node.key}-dot`} r="0.9" fill="#D88A43">
                        <animateMotion
                            dur={`${2.4 + (i % 3) * 0.4}s`}
                            begin={`${i * 0.3}s`}
                            repeatCount="indefinite"
                            path={`M50,50 L${node.x},${node.y}`}
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            keyTimes="0;0.12;0.75;1"
                            dur={`${2.4 + (i % 3) * 0.4}s`}
                            begin={`${i * 0.3}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <Glow className="-inset-6 sm:-inset-8" />
                <span aria-hidden="true" className={`festive-orbit absolute rounded-full border border-dashed border-amber/25 ${compact ? 'h-[104px] w-[104px] sm:h-[124px] sm:w-[124px]' : 'h-[166px] w-[166px]'}`} />
                <span aria-hidden="true" className={`festive-orbit-rev absolute rounded-full border border-bone/10 ${compact ? 'h-[122px] w-[122px] sm:h-[144px] sm:w-[144px]' : 'h-[192px] w-[192px]'}`} />
                <div className={`relative flex items-center justify-center rounded-full border border-amber/50 bg-ink-2 text-center shadow-[0_0_40px_-6px_rgba(216,138,67,0.5)] ${compact ? 'h-[84px] w-[84px] sm:h-[100px] sm:w-[100px]' : 'h-[140px] w-[140px]'}`}>
                    <span className={`label text-amber ${compact ? 'text-[9px]' : 'text-[11px]'}`}>Parivestra</span>
                </div>
            </div>

            {positioned.map((node, i) => {
                const Icon = iconMap[node.icon];
                return (
                    <div
                        key={node.key}
                        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        <span
                            style={{ animationDelay: `${i * 0.4}s` }}
                            className={`festive-node-pulse flex items-center justify-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/80 backdrop-blur-sm ${compact ? 'h-9 w-9' : 'h-12 w-12'}`}
                        >
                            <Icon size={compact ? 15 : 18} />
                        </span>
                        {!compact && <span className="label whitespace-nowrap text-[8.5px] text-bone/50">{node.label}</span>}
                    </div>
                );
            })}
        </div>
    );
};

const FestiveReach = () => {
    usePageMeta({
        title: 'Our Services | Parivestra — Multi-Channel Distribution',
        description: 'Reach high-intent audiences at scale through OEM, brand, college, creator, affiliate and offline distribution — one ecosystem, engineered to grow your revenue.',
        path: '/our-services',
    });

    const [bookOpen, setBookOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <div className="min-h-screen bg-ink font-sans text-bone">
            <FestiveHeader onBookNow={() => setBookOpen(true)} onContact={() => setContactOpen(true)} />
            <BookNowModal open={bookOpen} onClose={() => setBookOpen(false)} />
            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="relative overflow-hidden pb-20 pt-[150px] lg:pb-28 lg:pt-[190px]">
                <div aria-hidden="true" className="festive-grid tech-grid pointer-events-none absolute inset-0 opacity-60" />
                <Glow className="-left-40 top-10 h-[420px] w-[420px] opacity-60" />
                <Glow className="-right-32 top-60 h-[360px] w-[360px] opacity-40" delay={-6} />
                <Wrap className="grid items-center gap-16 lg:grid-cols-12">
                    <ScrollReveal className="lg:col-span-7">
                        <span className="label text-amber">{heroCopy.eyebrow}</span>
                        <h1 className="display display-xl mt-6 text-balance">
                            {heroCopy.headlineLead}{' '}
                            <span className="festive-accent-text">{heroCopy.headlineAccent}</span>
                        </h1>
                        <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-bone/75 sm:text-[20px]">{heroCopy.tagline}</p>
                        <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-bone/50">{heroCopy.sub}</p>
                        <p className="label mt-8 flex items-center gap-2.5 text-[10px] text-amber">
                            <span className="festive-node-pulse h-1.5 w-1.5 rounded-full bg-amber" />
                            Distribution capacity is limited — early bookings get priority channel allocation
                        </p>
                        <button type="button" onClick={() => setContactOpen(true)} className="label mt-6 inline-flex items-center gap-2 text-[11px] text-bone/55 transition-colors hover:text-amber">
                            Have a question first? Contact us <IconArrowUpRight size={12} />
                        </button>
                    </ScrollReveal>
                    <ScrollReveal delay={150} className="lg:col-span-5">
                        <HeroBookForm />
                    </ScrollReveal>
                </Wrap>
            </section>

            {/* ── Trust strip, immediately under the hero ─────────── */}
            <ScrollReveal delay={100} className="festive-marquee relative overflow-hidden border-y border-bone/10 bg-bone/[0.02] py-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
                <div className="flex w-max items-center gap-6" style={{ animation: 'marquee-x 36s linear infinite' }}>
                    {[...trustedBrands, ...trustedBrands].map((b, i) => (
                        <TrustLogo key={`trust-top-${b}-${i}`} brand={b} size="sm" />
                    ))}
                </div>
            </ScrollReveal>

            {/* ── Scale strip ──────────────────────────────────── */}
            {/* Horizontal swipe on mobile (brief §19) instead of a cramped 2-col grid —
                each stat becomes a small card so it reads as a deliberate carousel, not a
                wrapped list. Reverts to a plain grid from sm up where there's room. */}
            <section className="border-y border-bone/10 bg-bone/[0.02] py-10 sm:py-14">
                <div className="flex gap-3 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:hidden [&::-webkit-scrollbar]:hidden">
                    {stats.map((s) => (
                        <div key={s.label} className="shrink-0 snap-start rounded-xl border border-bone/10 bg-bone/[0.03] px-5 py-4" style={{ width: '42%' }}>
                            <dd className="display text-[clamp(1.6rem,7vw,2.2rem)] text-bone">
                                <Counter value={s.value} suffix={s.suffix} />
                            </dd>
                            <dt className="label mt-2 text-[9px] text-bone/45">{s.label}</dt>
                        </div>
                    ))}
                </div>
                <Wrap className="hidden sm:block">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-10 lg:grid-cols-6">
                        {stats.map((s) => (
                            <ScrollReveal key={s.label}>
                                <dd className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-bone">
                                    <Counter value={s.value} suffix={s.suffix} />
                                </dd>
                                <dt className="label mt-2 text-[9.5px] text-bone/45">{s.label}</dt>
                            </ScrollReveal>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ── One ecosystem ────────────────────────────────── */}
            <section className="relative overflow-hidden py-24 lg:py-32">
                <Wrap className="grid items-center gap-16 lg:grid-cols-12">
                    <ScrollReveal className="lg:col-span-5">
                        <span className="label text-amber">The distribution ecosystem</span>
                        <h2 className="display display-lg mt-6 text-balance">One ecosystem. Multiple distribution layers.</h2>
                        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-bone/60">
                            Parivestra brings together multiple user acquisition and distribution channels under one ecosystem — OEM, brand inventories, college, creators, affiliate, programmatic and offline.
                        </p>
                        <div className="mt-9"><PrimaryBtn onClick={() => setBookOpen(true)}>Book now</PrimaryBtn></div>
                    </ScrollReveal>
                    <ScrollReveal delay={150} className="lg:col-span-7">
                        <EcosystemGraphic />
                    </ScrollReveal>
                </Wrap>
            </section>

            {/* ── Distribution channels ───────────────────────── */}
            <section className="border-t border-bone/10 py-24 lg:py-32">
                <Wrap>
                    <ScrollReveal className="flex items-end justify-between gap-6 border-b border-bone/10 pb-6">
                        <h2 className="display display-lg max-w-[20ch] text-balance">Reach users where they discover, engage and convert.</h2>
                        <span className="label hidden text-bone/40 sm:block">Channels</span>
                    </ScrollReveal>

                    <div className="mt-10 grid gap-5 lg:grid-cols-2">
                        {channelCards.map((c, i) => {
                            const Icon = iconMap[c.icon];
                            return (
                                <ScrollReveal key={c.id} delay={(i % 2) * 100} className={c.id === 'offline' ? 'lg:col-span-2' : ''}>
                                    <div className={`group relative flex h-full flex-col rounded-2xl border border-bone/10 bg-bone/[0.03] p-7 sm:p-8 ${cardCls}`}>
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/25 bg-amber/10 text-amber"><Icon size={18} /></span>
                                            <span className="label text-[10px] text-bone/35">{c.index}</span>
                                        </div>
                                        <h3 className="display display-md mt-6">{c.title}</h3>
                                        <p className="mt-3 max-w-[48ch] text-[14.5px] leading-relaxed text-bone/55">{c.description}</p>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {c.tags.map((t) => <span key={t} className="label rounded-full border border-bone/12 px-3 py-1.5 text-[9px] text-bone/60">{t}</span>)}
                                        </div>

                                        {c.tags2 && (
                                            <div className="mt-5 border-t border-bone/10 pt-5">
                                                <span className="label text-[9px] text-bone/35">{c.kicker2}</span>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {c.tags2.map((t) => <span key={t} className="label rounded-full border border-bone/12 px-3 py-1.5 text-[9px] text-bone/60">{t}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        <button type="button" onClick={() => setBookOpen(true)} className="label mt-7 inline-flex items-center gap-2 self-start text-[10.5px] text-bone transition-colors group-hover:text-amber">
                                            Book now <IconArrowUpRight size={13} />
                                        </button>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </Wrap>
            </section>

            {/* ── Campaign objectives ─────────────────────────── */}
            <section className="border-t border-bone/10 py-24 lg:py-32">
                <Wrap>
                    <ScrollReveal className="border-b border-bone/10 pb-6">
                        <h2 className="display display-lg max-w-[22ch] text-balance">What do you want your campaign to achieve?</h2>
                    </ScrollReveal>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {objectives.map((o, i) => (
                            <ScrollReveal key={o.title} delay={i * 100}>
                                <div className={`flex h-full flex-col rounded-2xl border border-bone/10 bg-bone/[0.03] p-8 ${cardCls}`}>
                                    <span className="label flex h-9 w-9 items-center justify-center rounded-full border border-amber/25 bg-amber/10 text-[11px] text-amber">{o.index}</span>
                                    <h3 className="display display-md mt-4">{o.title}</h3>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-bone/55">{o.description}</p>
                                    <div className="mt-6 flex flex-1 flex-col justify-end gap-2 border-t border-bone/10 pt-5">
                                        <span className="label text-[9px] text-bone/35">Recommended channels</span>
                                        <div className="flex flex-wrap gap-2">
                                            {o.channels.map((c) => <span key={c} className="label rounded-full border border-bone/12 px-3 py-1.5 text-[9px] text-bone/60">{c}</span>)}
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => setBookOpen(true)} className="label mt-6 inline-flex items-center gap-2 self-start text-[10.5px] text-bone transition-colors hover:text-amber">
                                        Book now <IconArrowUpRight size={13} />
                                    </button>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ── Why Parivestra ───────────────────────────────── */}
            {/* The one light section on the page — a deliberate rhythm break (dark → light →
                dark) so the page reads as a built landing page, not one flat scroll. */}
            <section className="surface-bone py-24 lg:py-32">
                <Wrap>
                    <ScrollReveal className="border-b border-ink/10 pb-6">
                        <span className="label text-copper">Why Parivestra</span>
                        <h2 className="display display-lg mt-5 max-w-[20ch] text-balance text-ink">More than media. A distribution ecosystem.</h2>
                    </ScrollReveal>
                    <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                        {whyPoints.map((p, i) => (
                            <ScrollReveal key={p.title} delay={i * 80} className="border-t border-ink/10 pt-6">
                                <span className="label text-[10px] text-copper">0{i + 1}</span>
                                <h3 className="display display-md mt-3 max-w-[18ch] text-ink">{p.title}</h3>
                                <p className="mt-3 max-w-[48ch] text-[14.5px] leading-relaxed text-ink/60">{p.description}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal delay={200} className="mt-12">
                        <PrimaryBtn onClick={() => setBookOpen(true)} onLight>Book now</PrimaryBtn>
                    </ScrollReveal>
                </Wrap>
            </section>

            {/* ── Trusted brands ───────────────────────────────── */}
            <section className="border-t border-bone/10 py-20">
                <Wrap>
                    <ScrollReveal className="text-center">
                        <h2 className="display display-md">Brands who trust our distribution</h2>
                        <p className="label mt-4 text-[10px] text-bone/40">{trustedSub}</p>
                    </ScrollReveal>
                </Wrap>
                <ScrollReveal delay={100} className="festive-marquee relative mt-10 overflow-hidden">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
                    <div className="flex w-max items-center gap-7" style={{ animation: 'marquee-x 36s linear infinite' }}>
                        {[...trustedBrands, ...trustedBrands].map((b, i) => (
                            <TrustLogo key={`${b}-${i}`} brand={b} />
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* ── Case studies ─────────────────────────────────── */}
            <section className="border-t border-bone/10 py-24 lg:py-32">
                <Wrap>
                    <ScrollReveal className="border-b border-bone/10 pb-6">
                        <h2 className="display display-lg">Proven campaigns. Real distribution.</h2>
                    </ScrollReveal>
                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {caseStudies.map((cs, i) => (
                            <ScrollReveal key={cs.brand} delay={i * 100}>
                                <div className={`flex h-full flex-col rounded-2xl border border-bone/10 bg-bone/[0.03] p-8 ${cardCls}`}>
                                    <span className="label text-[10px] text-bone/40">{cs.brand} × Parivestra</span>
                                    <p className="mt-4 text-[15.5px] leading-snug text-bone/80">{cs.engagement}</p>

                                    <div className="mt-8">
                                        <span className="display block text-[clamp(2.4rem,5vw,3.2rem)] text-amber">{cs.result}</span>
                                        <span className="label mt-1 block text-[9.5px] text-bone/45">{cs.resultLabel}</span>
                                    </div>

                                    {cs.secondaryResult && (
                                        <div className="mt-4">
                                            <span className="display block text-[1.6rem] text-bone">{cs.secondaryResult}</span>
                                            <span className="label mt-1 block text-[9.5px] text-bone/45">{cs.secondaryLabel}</span>
                                        </div>
                                    )}

                                    {cs.stats && (
                                        <ul className="mt-5 space-y-2 border-t border-bone/10 pt-5">
                                            {cs.stats.map((s) => (
                                                <li key={s} className="flex items-start gap-2.5 text-[13px] text-bone/60"><IconCheck size={14} className="mt-0.5 shrink-0 text-amber" />{s}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <p className="mt-auto pt-6 text-[12.5px] leading-relaxed text-bone/40">{cs.channels}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ── Main conversion section ──────────────────────── */}
            <section className="relative overflow-hidden border-t border-bone/10 py-24 lg:py-32">
                <div aria-hidden="true" className="festive-grid tech-grid pointer-events-none absolute inset-0 opacity-50" />
                <Glow className="left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
                <Wrap className="text-center">
                    <ScrollReveal>
                        <h2 className="display display-xl text-balance">Ready to scale your revenue?</h2>
                        <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-bone/65">
                            Tell us your campaign objective, audience and requirements. Our team can help you build the right distribution mix through Parivestra.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <PrimaryBtn onClick={() => setBookOpen(true)}>Book now</PrimaryBtn>
                            <GhostBtn onClick={() => setContactOpen(true)}>Contact us</GhostBtn>
                        </div>
                    </ScrollReveal>
                </Wrap>
            </section>

            {/* ── Final CTA ─────────────────────────────────────── */}
            <section className="border-t border-bone/10 py-24">
                <Wrap className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                    <ScrollReveal>
                        <h2 className="display display-lg max-w-[18ch] text-balance">Your audience is ready. Is your distribution?</h2>
                        <p className="mt-4 text-[15px] text-bone/50">Build your next campaign with Parivestra.</p>
                    </ScrollReveal>
                    <ScrollReveal delay={100} className="flex flex-wrap items-center gap-3">
                        <PrimaryBtn onClick={() => setBookOpen(true)}>Book now</PrimaryBtn>
                        <GhostBtn onClick={() => setContactOpen(true)}>Contact us</GhostBtn>
                    </ScrollReveal>
                </Wrap>
            </section>

            <PariFooter />

            {/* Mobile sticky CTA — this page uses modals, not the site-wide Book a Call route. */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 px-5 py-3 backdrop-blur-sm sm:hidden">
                <button type="button" onClick={() => setBookOpen(true)} className="label flex h-12 w-full items-center justify-between rounded-full bg-amber px-6 text-ink">
                    Book now
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/15"><IconArrow size={14} /></span>
                </button>
            </div>
        </div>
    );
};

export default FestiveReach;
