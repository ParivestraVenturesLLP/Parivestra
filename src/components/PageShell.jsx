import React from 'react';
import PariNavbar from '../pages/PariNavbar';
import PariFooter from '../pages/PariFooter';

// Shared frame for inner pages: floating nav, warped-grid header, footer.
export const PageShell = ({ eyebrow, title, sub, children, actions }) => (
    <div className="min-h-screen bg-ink font-sans text-bone">
        <PariNavbar />
        <header className="relative overflow-hidden pb-16 pt-[150px] text-center lg:pb-24 lg:pt-[190px]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="rgba(239,231,219,.08)">
                    {[-3, -2, -1, 0, 1, 2, 3].map((c) => (
                        <path key={c} d={`M${720 + c * 205} -20 Q${720 + c * 232} 300 ${720 + c * 205} 620`} />
                    ))}
                    <path d="M-20 130 Q720 250 1460 130" />
                    <path d="M-20 400 Q720 500 1460 400" />
                </g>
            </svg>
            <div className="glow-copper pointer-events-none absolute inset-0" />
            <div className="relative mx-auto max-w-[980px] px-5">
                <span className="label text-[10.5px] text-bone/65">{eyebrow}</span>
                <h1 className="display display-xl mt-6 text-balance">{title}</h1>
                {sub && <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-relaxed text-bone/60 sm:text-[18px]">{sub}</p>}
                {actions && <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{actions}</div>}
            </div>
        </header>
        <main className="pb-[72px] lg:pb-0">{children}</main>
        <PariFooter />
    </div>
);

export const Wrap = ({ children, className = '' }) => (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>
);

export const Kicker = ({ index, label }) => (
    <div className="flex items-center justify-between border-b border-bone/12 pb-4">
        <span className="label text-[10px] text-copper">[ {index} ]</span>
        <span className="label text-[10px] text-stone">{label}</span>
    </div>
);
