import React from 'react';
import { Link } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';
import BookCall from '../components/ui/BookCall';
import { nav, proof } from '../content/homeContent';

const more = [
    { label: 'Infrastructure', to: '/infrastructure' },
    { label: 'Clientele', to: '/clientele' },
    { label: 'Distribution', to: '/distribution' },
    { label: 'Partnerships', to: '/partnerships' },
    { label: 'AI & Apps', to: '/ai-apps' },
];

const outcomeLinks = [
    { label: 'Acquire', to: '/solutions/acquisition' },
    { label: 'Transact', to: '/solutions/commerce' },
    { label: 'Launch', to: '/solutions/market-launch' },
    { label: 'Engage', to: '/solutions/engagement' },
    { label: 'Scale', to: '/solutions/distribution' },
];

const colTitle = 'label mb-5 text-[10px] text-ink/45';
const linkCls = 'text-[15px] text-ink/80 transition-colors hover:text-copper';

// Light footer with the oversized wordmark, as on Quantara. Carries positioning,
// primary CTA, outcome links, proof and contact (plan §11).
const PariFooter = () => (
    <footer className="surface-bone relative overflow-hidden">
        <div className="mx-auto max-w-[1360px] px-5 pb-8 pt-20 sm:px-8 lg:px-10">
            <div className="grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="display display-md max-w-[16ch]">
                        Outcome infrastructure for consumer brands.
                    </p>
                    <p className="mt-4 text-[15px] text-ink/60">Millions of touchpoints. One measurable outcome.</p>
                    <div className="mt-7"><BookCall section="footer" variant="ink" /></div>
                </div>

                <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
                    <div>
                        <h3 className={colTitle}>Explore</h3>
                        <ul className="space-y-3">
                            {nav.map((l) => <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className={colTitle}>Outcomes</h3>
                        <ul className="space-y-3">
                            {outcomeLinks.map((l) => <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className={colTitle}>More</h3>
                        <ul className="space-y-3">
                            {more.map((l) => <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className={colTitle}>Say hello</h3>
                        <ul className="space-y-3">
                            <li><a href="mailto:ayush@parivestra.com" className={linkCls}>ayush@parivestra.com</a></li>
                            <li><a href="tel:+917970476060" className={linkCls}>+91 79704 76060</a></li>
                            <li><a href="https://www.instagram.com/parivestra.official/" target="_blank" rel="noopener noreferrer" className={linkCls}>Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* proof */}
            <dl className="mt-16 grid grid-cols-3 border-y border-ink/12 py-6">
                {proof.map((pr) => (
                    <div key={pr.label}>
                        <dd className="display text-[clamp(1.4rem,3vw,2.6rem)]">{pr.prefix}{pr.value}{pr.suffix}</dd>
                        <dt className="label mt-1 text-[9px] text-ink/50">{pr.label}</dt>
                    </div>
                ))}
            </dl>

            <div
                aria-hidden="true"
                className="pointer-events-none mt-10 select-none text-center font-light leading-[0.82] tracking-[-0.06em] text-ink"
                style={{ fontSize: 'clamp(3.2rem, 17.5vw, 18rem)' }}
            >
                PARIVESTRA
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <span className="label text-[10px] text-ink/50">© 2026 Parivestra</span>
                <span className="label text-[10px] text-ink/50">Tell us the outcome. We’ll engineer the distribution.</span>
            </div>
        </div>
        <AIAssistant />
    </footer>
);

export default PariFooter;
