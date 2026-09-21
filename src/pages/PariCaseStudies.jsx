import React from 'react';
import { PageShell, Wrap } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import { IconCheck, IconArrowUpRight } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { caseStudies, moreStories, executionPhotos } from '../content/homeContent';

const DECK = 'https://drive.google.com/file/d/14sm-jmkoAbmcyzgFmxZ0Ryg4Xdeh6Bo3/view?usp=sharing';

const Metric = ({ value }) => {
    const m = /^(\d[\d,.]*)(.*)$/.exec(value);
    return (
        <span className="display block text-[clamp(7rem,18vw,15rem)] font-extralight leading-[0.8] tracking-[-0.06em]">
            {m[1]}<span className="text-amber">{m[2]}</span>
        </span>
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
            sub="Every story leads with the number, then the infrastructure that produced it."
            actions={<a href={DECK} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/25 px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:border-amber hover:text-amber">Full case study deck <IconArrowUpRight size={14} /></a>}
        >
            <Wrap className="space-y-6 pb-24">
                {caseStudies.map((c, i) => (
                    <article key={c.brand} id={c.brand.toLowerCase()} className="scroll-mt-28 rounded-lg border border-bone/12 bg-[#0c0b09] p-7 sm:p-12">
                        <div className="flex items-center justify-between">
                            <span className="label text-[10px] text-copper">0{i + 1} — {c.brand}</span>
                            <span className="label text-[10px] text-stone">{c.sector}</span>
                        </div>

                        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
                            <div className="lg:col-span-6">
                                <Metric value={c.metric} />
                                <p className="label mt-5 text-[11px] text-amber">{c.unit}</p>
                            </div>
                            <div className="lg:col-span-6">
                                <h2 className="display display-md">{c.title}</h2>
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
                                <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-bone/12 pt-6">
                                    <span className="label text-[10px] text-stone">Measured outcome</span>
                                    <span className="text-[15.5px] text-bone">{c.metric} {c.unit.toLowerCase()}</span>
                                </div>
                                <div className="mt-6"><BookCall section={`case-${c.brand.toLowerCase()}`} variant="bone" size="sm" /></div>
                            </div>
                        </div>
                    </article>
                ))}
            </Wrap>

            <Wrap className="pb-24">
                <div className="flex items-end justify-between border-b border-bone/12 pb-4">
                    <h2 className="display display-md">More stories</h2>
                    <span className="label hidden text-[10px] text-stone sm:block">Headline numbers in review</span>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {moreStories.map((c) => (
                        <article key={c.brand} id={c.brand.toLowerCase()} className="scroll-mt-28 rounded-lg border border-bone/12 bg-[#0c0b09] p-7">
                            <div className="flex items-center justify-between">
                                <span className="label text-[10px] text-copper">{c.brand}</span>
                                <span className="label text-[10px] text-stone">{c.sector}</span>
                            </div>
                            <h3 className="display mt-8 text-[1.9rem]">{c.title}</h3>
                            <ul className="mt-5 space-y-2.5">
                                {c.execution.map((e) => (
                                    <li key={e} className="flex items-start gap-3 text-[15px] text-bone/70"><IconCheck size={14} className="mt-1 shrink-0 text-amber" />{e}</li>
                                ))}
                            </ul>
                            <ul className="mt-6 flex flex-wrap gap-2">
                                {c.stack.map((t) => <li key={t} className="label rounded border border-bone/14 px-2.5 py-1 text-[9.5px] text-bone/60">{t}</li>)}
                            </ul>
                        </article>
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
