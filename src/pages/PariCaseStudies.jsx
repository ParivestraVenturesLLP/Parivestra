import React, { useState } from 'react';
import { PageShell, Wrap } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import { IconCheck, IconArrowUpRight, IconDownload } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { sendContactMessage } from '../services/api';
import { caseStudies, moreStories, executionPhotos } from '../content/homeContent';

import swiggyLogo from '../assets/swiggy.png';
import uberLogo from '../assets/Uber.svg';
import meeshoLogo from '../assets/meesho.jpg';
import flixbusLogo from '../assets/flixbus.png';
import nestleLogo from '../assets/nestle.png';
import myntraLogo from '../assets/myntra.jpg';

// Every brand's own logo, shown in a light chip so it reads correctly regardless of
// the source file's own format/background (JPG, transparent PNG, SVG — all safe here).
const logoFor = { Swiggy: swiggyLogo, Uber: uberLogo, Meesho: meeshoLogo, FlixBus: flixbusLogo, Nestlé: nestleLogo, Myntra: myntraLogo };

const DECK = 'https://drive.google.com/file/d/14sm-jmkoAbmcyzgFmxZ0Ryg4Xdeh6Bo3/view?usp=sharing';

const fieldCls = 'h-12 rounded-lg border border-bone/14 bg-transparent px-4 text-[14px] text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-amber';

// Split "50+" into digits + suffix so the "+" can carry the accent colour — the same
// oversized editorial number treatment used on the homepage preview cards.
const Metric = ({ value }) => {
    const m = /^(\d[\d,.]*)(.*)$/.exec(value);
    return (
        <span className="display block text-[clamp(5rem,10vw,9rem)] font-extralight leading-[0.82] tracking-[-0.06em]">
            {m[1]}<span className="text-amber">{m[2]}</span>
        </span>
    );
};

const BrandMark = ({ brand, size = 'md' }) => {
    const logo = logoFor[brand];
    const h = size === 'lg' ? 'h-8 sm:h-9' : 'h-6';
    if (!logo) return <span className="display text-[1.5rem]">{brand}</span>;
    return (
        <span className={`inline-flex ${size === 'lg' ? 'h-14 px-5' : 'h-11 px-4'} shrink-0 items-center rounded-lg bg-bone`}>
            <img src={logo} alt={brand} className={`${h} w-auto max-w-[140px] object-contain`} />
        </span>
    );
};

// Gated download: name/company/work email/phone — same lead backend as Book a Call
// (all four fields are required server-side), just without the objective chips.
const DownloadForm = ({ brand }) => {
    const [data, setData] = useState({ name: '', brandName: '', emailId: '', phoneNumber: '' });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [error, setError] = useState('');

    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            const res = await sendContactMessage({
                ...data,
                serviceRequired: `Download case study: ${brand}`,
                source: 'case_study_download',
            });
            if (res.success) {
                if (window.fbq) window.fbq('track', 'Lead', { content_name: `Case Study Download — ${brand}`, value: 0, currency: 'INR' });
                setStatus('success');
            } else {
                setStatus('error');
                setError(res.message || 'Could not send. Please try again.');
            }
        } catch {
            setStatus('error');
            setError('Network error. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="rounded-xl border border-amber/30 bg-amber/10 p-6">
                <p className="flex items-center gap-2 text-[15px] text-bone/90"><IconCheck size={17} className="shrink-0 text-amber" /> Thanks — here’s the {brand} case study.</p>
                <a href={DECK} target="_blank" rel="noreferrer" className="label mt-4 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-ink transition-colors hover:bg-bone">
                    Open case study <IconArrowUpRight size={13} />
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="grid gap-3.5 rounded-xl border border-bone/14 bg-bone/[0.03] p-6 sm:grid-cols-2">
            <p className="label text-[10px] text-stone sm:col-span-2">Get the full {brand} case study</p>
            <input required placeholder="Your name" value={data.name} onChange={set('name')} className={fieldCls} />
            <input required placeholder="Company" value={data.brandName} onChange={set('brandName')} className={fieldCls} />
            <input required type="email" placeholder="Work email" value={data.emailId} onChange={set('emailId')} className={fieldCls} />
            <input required type="tel" placeholder="Phone" value={data.phoneNumber} onChange={set('phoneNumber')} className={fieldCls} />
            {status === 'error' && <p role="alert" className="text-[13px] text-red-300 sm:col-span-2">{error}</p>}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="label mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-amber text-ink transition-colors hover:bg-bone disabled:opacity-60 sm:col-span-2"
            >
                {status === 'submitting' ? 'Sending…' : <>Download case study <IconDownload size={14} /></>}
            </button>
        </form>
    );
};

// Full-width detail panel that opens beneath a clicked card, spanning both grid columns.
const CaseDetail = ({ c }) => {
    const [wantsDownload, setWantsDownload] = useState(false);
    return (
        <div className="fade-up rounded-lg border border-amber/25 bg-[#0c0b09] p-7 sm:p-10 md:col-span-2">
            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <h3 className="display display-md max-w-[24ch]">{c.title}</h3>

                    <p className="label mt-8 text-[10px] text-stone">Distribution deployed</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {c.stack.map((t) => <li key={t} className="label rounded border border-bone/14 px-3 py-1.5 text-[10px] text-bone/70">{t}</li>)}
                    </ul>

                    <p className="label mt-8 text-[10px] text-stone">Execution</p>
                    <ul className="mt-3 space-y-2.5">
                        {c.execution.map((e) => (
                            <li key={e} className="flex items-start gap-3 text-[15.5px] text-bone/75"><IconCheck size={15} className="mt-1 shrink-0 text-amber" />{e}</li>
                        ))}
                    </ul>

                    {c.metric && (
                        <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-bone/12 pt-6">
                            <span className="label text-[10px] text-stone">Measured outcome</span>
                            <span className="text-[15.5px] text-bone">{c.metric} {c.unit.toLowerCase()}</span>
                        </div>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <BookCall section={`case-${c.brand.toLowerCase()}`} variant="bone" size="sm" />
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <p className="label mb-3 text-[10px] text-stone">Photos</p>
                    <div className="grid grid-cols-2 gap-2.5">
                        {executionPhotos.map((p) => (
                            <figure key={p.src} className="photo-card relative aspect-[4/5] overflow-hidden rounded-lg border border-bone/12">
                                <img src={p.src} alt={p.alt} loading="lazy" className="photo-grade h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                                <figcaption className="label absolute bottom-2.5 left-2.5 text-[9px] text-bone/85">{p.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                    <p className="mt-2.5 text-[11px] text-bone/40">Representative on-ground execution photography.</p>

                    <div className="mt-6">
                        {wantsDownload ? (
                            <DownloadForm brand={c.brand} />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setWantsDownload(true)}
                                className="label flex h-12 w-full items-center justify-center gap-2 rounded-full border border-bone/25 text-bone transition-colors hover:border-amber hover:text-amber"
                            >
                                Download case study <IconDownload size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// One premium editorial card per case study — brand mark (not the name) up top, a
// huge headline number, then the title and stack tags. Click opens the full story.
const CaseCard = ({ c, index, open, onToggle }) => (
    <>
        <button
            type="button"
            id={c.brand.toLowerCase()}
            onClick={onToggle}
            aria-expanded={open}
            className={`group scroll-mt-28 flex h-full min-h-[440px] flex-col justify-between rounded-lg border p-7 text-left transition-colors duration-300 sm:p-9 ${open ? 'border-amber/50' : 'border-bone/12 hover:border-amber/50'} bg-[#0c0b09]`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="label text-[10px] text-copper">0{index + 1}</span>
                    <BrandMark brand={c.brand} />
                </div>
                <span className="label hidden text-[10px] text-stone sm:block">{c.sector}</span>
            </div>

            {c.metric && (
                <div className="my-10">
                    <Metric value={c.metric} />
                    <p className="label mt-5 text-[10.5px] text-amber">{c.unit}</p>
                </div>
            )}

            <div>
                <h3 className="display display-md max-w-[22ch]">{c.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                    {c.stack.map((t) => <li key={t} className="label rounded border border-bone/12 px-2.5 py-1.5 text-[9.5px] text-bone/60">{t}</li>)}
                </ul>
                <span className={`label mt-7 inline-flex items-center gap-2 text-[10.5px] transition-colors ${open ? 'text-amber' : 'text-bone group-hover:text-amber'}`}>
                    {open ? 'Close case study' : 'View case study'} <IconArrowUpRight size={13} className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
                </span>
            </div>
        </button>
        {open && <CaseDetail c={c} />}
    </>
);

// Outcome-first template (plan §9): the number leads, then problem (when approved), the
// distribution deployed, the execution, the measured outcome, and a Book a Call.
const PariCaseStudies = () => {
    const [openBrand, setOpenBrand] = useState(null);

    usePageMeta({
        title: 'Case Studies | Parivestra — Quantified Outcome Stories',
        description: 'Outcome-first case studies: colleges activated, cities of UGC, states of revenue-linked distribution and routes of performance marketing.',
        path: '/case-studies',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: caseStudies.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: { '@type': 'Article', headline: `${c.metric} ${c.unit} — ${c.brand}`, about: c.title, author: { '@type': 'Organization', name: 'Parivestra' } },
            })),
        },
    });

    const toggle = (brand) => setOpenBrand((b) => (b === brand ? null : brand));

    return (
        <PageShell
            eyebrow="Case studies"
            title="Outcomes, not portfolios."
            sub="Every story leads with the number, then the infrastructure that produced it. Click a brand to open the full story."
        >
            <Wrap className="pb-24">
                <div className="grid gap-4 md:grid-cols-2">
                    {caseStudies.map((c, i) => (
                        <CaseCard key={c.brand} c={c} index={i} open={openBrand === c.brand} onToggle={() => toggle(c.brand)} />
                    ))}
                </div>
            </Wrap>

            <Wrap className="pb-24">
                <div className="flex items-end justify-between border-b border-bone/12 pb-4">
                    <h2 className="display display-md">More stories</h2>
                    <span className="label hidden text-[10px] text-stone sm:block">Headline numbers in review</span>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {moreStories.map((c, i) => (
                        <CaseCard key={c.brand} c={c} index={i} open={openBrand === c.brand} onToggle={() => toggle(c.brand)} />
                    ))}
                </div>
            </Wrap>

            <Wrap className="pb-28">
                <div className="flex items-end justify-between border-b border-bone/12 pb-4">
                    <h2 className="display display-md">Execution, <span className="text-bone/45">not slides.</span></h2>
                    <span className="label hidden text-[10px] text-stone sm:block">On the ground</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {executionPhotos.map((p) => (
                        <figure key={p.src} className="photo-card relative aspect-[4/5] overflow-hidden rounded-lg border border-bone/12">
                            <img src={p.src} alt={p.alt} loading="lazy" className="photo-grade h-full w-full object-cover" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                            <figcaption className="label absolute bottom-4 left-4 text-[10px] text-bone/85">{p.caption}</figcaption>
                        </figure>
                    ))}
                </div>
                <div className="mt-16 flex justify-center"><BookCall section="case-studies-end" variant="bone" size="lg" /></div>
            </Wrap>
        </PageShell>
    );
};

export default PariCaseStudies;
