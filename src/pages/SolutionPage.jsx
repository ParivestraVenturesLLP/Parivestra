import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PageShell, Wrap, Kicker } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import OutcomeFlow from '../components/ui/OutcomeFlow';
import ExtrudeBlock from '../components/ui/ExtrudeBlock';
import { outcomeIcons, IconArrow } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { solutions, outcomes, objectiveFor, caseStudies } from '../content/homeContent';

// One outcome-led page per solution (plan §14). Each ends with the primary CTA (plan §10).
const SolutionPage = () => {
    const { id } = useParams();
    const s = solutions.find((x) => x.id === id);

    const jsonLd = s && {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${s.name} — ${s.outcome}`,
        description: `${s.promise} Delivered by the Parivestra Consumer Mesh: ${s.points.join(', ')}.`,
        provider: { '@type': 'Organization', name: 'Parivestra', url: 'https://parivestra.com' },
        areaServed: 'IN',
        serviceType: s.name,
    };
    usePageMeta({
        title: s ? `${s.name} | ${s.outcome} — Parivestra` : 'Parivestra',
        description: s ? `${s.promise} ${s.name} by Parivestra: ${s.points.join(', ')}.` : '',
        path: `/solutions/${id}`,
        jsonLd,
    });

    if (!s) return <Navigate to="/#solutions" replace />;

    const o = outcomes.find((x) => x.name === s.outcome);
    const Icon = outcomeIcons[o.id];
    const others = solutions.filter((x) => x.id !== s.id);

    return (
        <PageShell
            eyebrow={`Solution · ${s.outcome}`}
            title={<>{s.promise}</>}
            sub={`${s.name}, powered by the Parivestra Consumer Mesh.`}
            actions={<BookCall section={`solution-page-${s.id}`} variant="bone" objective={objectiveFor[s.outcome]} />}
        >
            <Wrap className="pb-24">
                <Kicker index="01" label="Infrastructure deployed" />
                <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="mx-auto w-[220px]"><ExtrudeBlock active><Icon size={38} /></ExtrudeBlock></div>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
                        {s.points.map((p, i) => (
                            <li key={p} className="flex items-center gap-4 rounded-lg border border-bone/12 bg-[#0c0b09] px-5 py-4">
                                <span className="label text-[10px] text-copper">0{i + 1}</span>
                                <span className="text-[16px] text-bone/85">{p}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="02" label="How it converges" />
                <h2 className="display display-md mt-10 max-w-[24ch]">Millions of touchpoints. <span className="text-bone/45">One measurable outcome.</span></h2>
                <div className="mt-14"><OutcomeFlow /></div>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="03" label="Proof" />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {caseStudies.map((c) => (
                        <Link key={c.brand} to={`/case-studies#${c.brand.toLowerCase()}`} className="group rounded-lg border border-bone/12 bg-[#0c0b09] p-6 transition-colors hover:border-amber/50">
                            <span className="label text-[10px] text-copper">{c.brand}</span>
                            <p className="display mt-6 text-[3.4rem] font-extralight leading-none">{c.metric}</p>
                            <p className="label mt-3 text-[9.5px] text-amber">{c.unit}</p>
                        </Link>
                    ))}
                </div>
            </Wrap>

            <Wrap className="pb-28">
                <div className="rounded-lg border border-bone/12 bg-[#0c0b09] p-8 text-center sm:p-14">
                    <p className="label text-[10px] text-stone">Tell us the outcome</p>
                    <h2 className="display display-lg mx-auto mt-5 max-w-[16ch]">Tell us the outcome. <span className="text-bone/45">We’ll engineer the distribution.</span></h2>
                    <div className="mt-9"><BookCall section={`solution-page-end-${s.id}`} variant="bone" size="lg" objective={objectiveFor[s.outcome]} /></div>
                </div>

                <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-bone/12 pt-6">
                    <span className="label text-[10px] text-stone">Other solutions</span>
                    {others.map((x) => (
                        <Link key={x.id} to={`/solutions/${x.id}`} className="label inline-flex items-center gap-2 text-[10.5px] text-bone/75 transition-colors hover:text-amber">
                            {x.name} <IconArrow size={12} />
                        </Link>
                    ))}
                </div>
            </Wrap>
        </PageShell>
    );
};

export default SolutionPage;
