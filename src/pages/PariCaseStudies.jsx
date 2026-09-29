import React, { useState } from 'react';
import { PageShell, Wrap } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import { IconCheck, IconArrowUpRight, IconDownload, IconArrow } from '../components/ui/icons';
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

const fieldCls = 'h-11 rounded border border-bone/14 bg-transparent px-3.5 text-[14px] text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-amber';

const Metric = ({ value }) => {
    const m = /^(\d[\d,.]*)(.*)$/.exec(value);
    return (
        <span className="display block text-[clamp(3.5rem,8vw,6.5rem)] font-extralight leading-[0.85] tracking-[-0.05em]">
            {m[1]}<span className="text-amber">{m[2]}</span>
        </span>
    );
};

const BrandMark = ({ brand }) => {
    const logo = logoFor[brand];
    if (!logo) return <span className="display text-[1.5rem]">{brand}</span>;
    return (
        <span className="inline-flex h-11 shrink-0 items-center rounded-md bg-bone px-4">
            <img src={logo} alt={brand} className="h-6 w-auto max-w-[120px] object-contain" />
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
            <div className="mt-5 rounded-lg border border-amber/30 bg-amber/10 p-5">
                <p className="flex items-center gap-2 text-[14.5px] text-bone/90"><IconCheck size={16} className="text-amber" /> Thanks — here’s the {brand} case study.</p>
                <a href={DECK} target="_blank" rel="noreferrer" className="label mt-4 inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-ink transition-colors hover:bg-bone">
                    Open case study <IconArrowUpRight size={13} />
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="mt-5 grid gap-3 rounded-lg border border-bone/14 bg-bone/[0.03] p-5 sm:grid-cols-2">
            <input required placeholder="Your name" value={data.name} onChange={set('name')} className={fieldCls} />
            <input required placeholder="Company" value={data.brandName} onChange={set('brandName')} className={fieldCls} />
            <input required type="email" placeholder="Work email" value={data.emailId} onChange={set('emailId')} className={fieldCls} />
            <input required type="tel" placeholder="Phone" value={data.phoneNumber} onChange={set('phoneNumber')} className={fieldCls} />
            {status === 'error' && <p role="alert" className="text-[13px] text-red-300 sm:col-span-2">{error}</p>}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="label mt-1 flex h-11 items-center justify-center gap-2 rounded-full bg-amber text-ink transition-colors hover:bg-bone disabled:opacity-60 sm:col-span-2"
            >
                {status === 'submitting' ? 'Sending…' : <>Get the {brand} case study <IconDownload size={14} /></>}
            </button>
        </form>
    );
};

// One card per case study: brand mark (not the name) + headline number up front, click
// to open the full write-up, execution photos and the gated download.
const CaseCard = ({ c, index }) => {
    const [open, setOpen] = useState(false);
    const [wantsDownload, setWantsDownload] = useState(false);

    return (
        <article id={c.brand.toLowerCase()} className="scroll-mt-28 overflow-hidden rounded-lg border border-bone/12 bg-[#0c0b09]">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex w-full flex-col gap-6 p-6 text-left transition-colors hover:bg-bone/[0.02] sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
                <div className="flex items-center gap-5">
                    <span className="label text-[10px] text-copper">0{index + 1}</span>
                    <BrandMark brand={c.brand} />
                    <span className="label hidden text-[10px] text-stone sm:block">{c.sector}</span>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                    {c.metric && (
                        <div className="text-right">
                            <Metric value={c.metric} />
                            <p className="label mt-1 text-[9.5px] text-amber">{c.unit}</p>
                        </div>
                    )}
                    <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone transition-transform duration-300"
                        style={{ transform: open ? 'rotate(90deg)' : 'none' }}
                    >
                        <IconArrow size={14} />
                    </span>
                </div>
            </button>

            {open && (
                <div className="fade-up border-t border-bone/12 p-6 sm:p-8">
                    <h2 className="display display-md max-w-[26ch]">{c.title}</h2>

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

                    <p className="label mb-3 mt-9 text-[10px] text-stone">Photos</p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {executionPhotos.map((p) => (
                            <figure key={p.src} className="photo-card relative aspect-[4/5] overflow-hidden rounded-md border border-bone/12">
                                <img src={p.src} alt={p.alt} loading="lazy" className="photo-grade h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                                <figcaption className="label absolute bottom-2.5 left-2.5 text-[9px] text-bone/85">{p.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                    <p className="mt-2.5 text-[11.5px] text-bone/40">Representative on-ground execution photography.</p>

                    <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-bone/12 pt-6">
                        <BookCall section={`case-${c.brand.toLowerCase()}`} variant="bone" size="sm" />
                        {!wantsDownload && (
                            <button
                                type="button"
                                onClick={() => setWantsDownload(true)}
                                className="label inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-bone transition-colors hover:border-amber hover:text-amber"
                            >
                                Download case study <IconDownload size={13} />
                            </button>
                        )}
                    </div>

                    {wantsDownload && <DownloadForm brand={c.brand} />}
                </div>
            )}
        </article>
    );
};

// Outcome-first template (plan §9): the number leads, then problem (when approved), the
// distribution deployed, the execution, the measured outcome, and a Book a Call.
const PariCaseStudies = () => {
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

    return (
        <PageShell
            eyebrow="Case studies"
            title="Outcomes, not portfolios."
            sub="Click a brand to open the full story, the execution photos and the case study download."
        >
            <Wrap className="space-y-4 pb-16">
                {caseStudies.map((c, i) => <CaseCard key={c.brand} c={c} index={i} />)}
            </Wrap>

            <Wrap className="pb-28">
                <div className="flex items-end justify-between border-b border-bone/12 pb-4">
                    <h2 className="display display-md">More stories</h2>
                    <span className="label hidden text-[10px] text-stone sm:block">Headline numbers in review</span>
                </div>
                <div className="mt-4 space-y-4">
                    {moreStories.map((c, i) => <CaseCard key={c.brand} c={c} index={i} />)}
                </div>

                <div className="mt-16 flex justify-center"><BookCall section="case-studies-end" variant="bone" size="lg" /></div>
            </Wrap>
        </PageShell>
    );
};

export default PariCaseStudies;
