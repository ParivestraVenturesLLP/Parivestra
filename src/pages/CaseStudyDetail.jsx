import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PageShell, Wrap, Kicker } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import { IconCheck, IconDownload } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { BrandMark, Metric, DownloadForm } from '../components/caseStudies/shared';
import { caseStudies, moreStories, executionPhotos } from '../content/homeContent';

const ALL = [...caseStudies, ...moreStories];

// Dedicated page per case study — clicking a brand on /case-studies navigates here,
// instead of expanding the listing card in place.
const CaseStudyDetail = () => {
    const { brand: slug } = useParams();
    const [wantsDownload, setWantsDownload] = useState(false);
    const c = ALL.find((x) => x.brand.toLowerCase() === (slug || '').toLowerCase());

    usePageMeta({
        title: c ? `${c.brand} | Case Study — Parivestra` : 'Case Study | Parivestra',
        description: c ? `${c.title}. ${c.metric ? `${c.metric} ${c.unit}.` : ''} Distribution deployed: ${c.stack.join(', ')}.` : '',
        path: `/case-studies/${slug}`,
        jsonLd: c && {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.metric ? `${c.metric} ${c.unit} — ${c.brand}` : c.title,
            about: c.title,
            author: { '@type': 'Organization', name: 'Parivestra' },
        },
    });

    if (!c) return <Navigate to="/case-studies" replace />;

    const others = ALL.filter((x) => x.brand !== c.brand);

    return (
        <PageShell
            eyebrow={<Link to="/case-studies" className="hover:text-amber">← All case studies</Link>}
            title={<span className="inline-flex flex-wrap items-center justify-center gap-4"><BrandMark brand={c.brand} size="lg" /></span>}
            sub={c.title}
        >
            {c.metric && (
                <Wrap className="pb-4">
                    <div className="mb-14 flex flex-col items-center text-center">
                        <Metric value={c.metric} className="text-[clamp(5.5rem,14vw,11rem)]" />
                        <p className="label mt-4 text-[11px] text-amber">{c.unit}</p>
                    </div>
                </Wrap>
            )}

            <Wrap className="pb-24">
                <Kicker index="01" label="Distribution deployed" />
                <ul className="mt-6 flex flex-wrap gap-2">
                    {c.stack.map((t) => <li key={t} className="label rounded border border-bone/14 px-3 py-1.5 text-[10px] text-bone/70">{t}</li>)}
                </ul>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="02" label="Execution" />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {c.execution.map((e) => (
                        <li key={e} className="flex items-start gap-3 text-[16px] text-bone/75"><IconCheck size={16} className="mt-1 shrink-0 text-amber" />{e}</li>
                    ))}
                </ul>

                {c.metric && (
                    <div className="mt-10 flex flex-wrap items-center gap-4 rounded-lg border border-bone/12 bg-[#0c0b09] p-6">
                        <span className="label text-[10px] text-stone">Measured outcome</span>
                        <span className="text-[16px] text-bone">{c.metric} {c.unit.toLowerCase()}</span>
                    </div>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <BookCall section={`case-detail-${c.brand.toLowerCase()}`} variant="bone" />
                </div>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="03" label="Photos" />
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {executionPhotos.map((p) => (
                        <figure key={p.src} className="photo-card relative aspect-[4/5] overflow-hidden rounded-lg border border-bone/12">
                            <img src={p.src} alt={p.alt} loading="lazy" className="photo-grade h-full w-full object-cover" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                            <figcaption className="label absolute bottom-2.5 left-2.5 text-[9px] text-bone/85">{p.caption}</figcaption>
                        </figure>
                    ))}
                </div>
                <p className="mt-3 text-[11.5px] text-bone/40">Representative on-ground execution photography.</p>

                <div className="mt-8 max-w-md">
                    {wantsDownload ? (
                        <DownloadForm brand={c.brand} />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setWantsDownload(true)}
                            className="label flex h-12 w-full items-center justify-center gap-2 rounded-full border border-bone/25 text-bone transition-colors hover:border-amber hover:text-amber sm:w-auto sm:px-8"
                        >
                            Download case study <IconDownload size={14} />
                        </button>
                    )}
                </div>
            </Wrap>

            <Wrap className="pb-28">
                <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-bone/12 pt-6">
                    <span className="label text-[10px] text-stone">Other stories</span>
                    {others.map((x) => (
                        <Link key={x.brand} to={`/case-studies/${x.brand.toLowerCase()}`} className="label inline-flex items-center gap-2 text-[10.5px] text-bone/75 transition-colors hover:text-amber">
                            {x.brand}
                        </Link>
                    ))}
                </div>
            </Wrap>
        </PageShell>
    );
};

export default CaseStudyDetail;
