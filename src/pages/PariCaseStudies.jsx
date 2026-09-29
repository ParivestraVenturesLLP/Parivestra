import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell, Wrap } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import { IconArrowUpRight } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { BrandMark, Metric } from '../components/caseStudies/shared';
import { caseStudies, moreStories, executionPhotos } from '../content/homeContent';

// One premium editorial card per case study — brand mark (not the name) up top, a
// huge headline number, then the title and stack tags. Clicking opens that case
// study's own page (via CaseStudyDetail), not an inline expand on this listing.
const CaseCard = ({ c, index }) => (
    <Link
        to={`/case-studies/${c.brand.toLowerCase()}`}
        className="group flex h-full min-h-[440px] flex-col justify-between rounded-lg border border-bone/12 bg-[#0c0b09] p-7 transition-colors duration-300 hover:border-amber/50 sm:p-9"
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
            <span className="label mt-7 inline-flex items-center gap-2 text-[10.5px] text-bone transition-colors group-hover:text-amber">
                View case study <IconArrowUpRight size={13} />
            </span>
        </div>
    </Link>
);

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
            sub="Every story leads with the number, then the infrastructure that produced it. Click a brand to open its case study."
        >
            <Wrap className="pb-24">
                <div className="grid gap-4 md:grid-cols-2">
                    {caseStudies.map((c, i) => <CaseCard key={c.brand} c={c} index={i} />)}
                </div>
            </Wrap>

            <Wrap className="pb-24">
                <div className="flex items-end justify-between border-b border-bone/12 pb-4">
                    <h2 className="display display-md">More stories</h2>
                    <span className="label hidden text-[10px] text-stone sm:block">Headline numbers in review</span>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {moreStories.map((c, i) => <CaseCard key={c.brand} c={c} index={i} />)}
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
