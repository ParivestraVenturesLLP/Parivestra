import React from 'react';
import { Link } from 'react-router-dom';
import ConsumerMesh from '../ui/ConsumerMesh';
import BookCall from '../ui/BookCall';
import Counter from '../ui/Counter';
import ScrambleText from '../ui/ScrambleText';
import { hero, proof } from '../../content/homeContent';

// Perspective-warped grid: barrel-bent verticals and smiling horizontals (Quantara hero).
const WarpGrid = () => {
    const cols = [-3, -2, -1, 0, 1, 2, 3];
    return (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="rgba(239,231,219,.10)" strokeWidth="1">
                {cols.map((c) => {
                    const top = 720 + c * 205, mid = 720 + c * 232, bot = 720 + c * 205;
                    return <path key={c} d={`M${top} -20 Q${mid} 450 ${bot} 920`} />;
                })}
                {[170, 430, 700].map((y, i) => (
                    <path key={y} d={`M-20 ${y - 30 + i * 6} Q720 ${y + 90 - i * 22} 1460 ${y - 30 + i * 6}`} />
                ))}
            </g>
            <g fill="none" stroke="rgba(216,138,67,.35)" strokeWidth="1">
                <rect x="212" y="214" width="8" height="8" />
                <rect x="1210" y="330" width="8" height="8" />
                <path d="M338 604l5 5m0-5l-5 5" />
            </g>
        </svg>
    );
};

const Label = ({ className, children }) => (
    <span className={`label absolute hidden text-[10.5px] text-bone/60 md:block ${className}`}>{children}</span>
);

const Hero = () => (
    <section id="top" className="relative h-[100svh] min-h-[720px] overflow-hidden">
        <WarpGrid />
        <div className="glow-copper pointer-events-none absolute inset-0" />

        {/* scattered mono proof labels: the Quantara VISION / SMART / PRECISE marks */}
        <Label className="left-[4%] top-[27%]"><Counter value={proof[0].value} suffix="+" /> {proof[0].label}</Label>
        <Label className="right-[4%] top-[27%]"><Counter value={proof[1].value} suffix="M+" /> Touchpoints</Label>
        <Label className="left-[9%] top-[60%]"><Counter value={proof[2].value} prefix="₹" suffix="Cr+" /> {proof[2].label}</Label>

        {/* Consumer Mesh, anchored to the lower half of the hero */}
        <div
            className="absolute inset-x-0 bottom-0 h-[58%] min-h-[380px]"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, #000 34%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 34%)' }}
        >
            <ConsumerMesh className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col items-center px-5 pt-[118px] text-center sm:pt-[132px]">
            <span className="label text-[10.5px] text-bone/65"><ScrambleText text={hero.eyebrow.toUpperCase()} duration={900} /></span>

            <h1 className="display mt-6 text-balance text-[clamp(2.15rem,4.9vw,4.4rem)]">
                We’re reimagining how brands reach, engage and convert consumers.
            </h1>

            <p className="mt-6 max-w-[620px] text-[15.5px] leading-relaxed text-bone/60 sm:text-[17px]">{hero.sub}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <BookCall section="hero" size="md" variant="bone" />
                <Link
                    to="/#outcomes"
                    className="inline-flex h-12 items-center rounded-full border border-bone/25 px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:border-amber hover:text-amber"
                >
                    {hero.secondary}
                </Link>
            </div>
        </div>

        {/* mobile proof line */}
        <p className="label absolute inset-x-0 bottom-20 z-10 text-center text-[9.5px] text-bone/60 md:hidden">
            100+ Brands · 300M+ Touchpoints · ₹120Cr+ Sales
        </p>

        {/* scroll cue */}
        <span className="absolute bottom-5 left-1/2 z-10 h-9 w-[22px] -translate-x-1/2 rounded-full border border-bone/35" aria-hidden="true">
            <span className="mx-auto mt-2 block h-1.5 w-[3px] rounded-full bg-bone/70" />
        </span>
    </section>
);

export default Hero;
