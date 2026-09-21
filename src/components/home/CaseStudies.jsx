import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './shared';
import ScrollReveal from '../ScrollReveal';
import BookCall from '../ui/BookCall';
import { IconArrowUpRight } from '../ui/icons';
import { caseStudies, executionPhotos } from '../../content/homeContent';

// Split "50+" into digits + suffix so the "+" can carry the accent colour.
const Metric = ({ value }) => {
    const m = /^(\d[\d,.]*)(.*)$/.exec(value);
    return (
        <span className="display block text-[clamp(6rem,14vw,12.5rem)] font-extralight leading-[0.82] tracking-[-0.06em]">
            {m[1]}<span className="text-amber">{m[2]}</span>
        </span>
    );
};

const CaseStudies = () => (
    <section id="case-studies" className="relative scroll-mt-16 py-28 lg:py-40">
        <Container>
            <ScrollReveal className="flex items-start justify-between gap-6 border-b border-bone/12 pb-5">
                <h2 className="display display-md max-w-[20ch]">Outcomes, <span className="text-bone/45">not portfolios.</span></h2>
                <span className="label text-stone">Case studies</span>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
                {caseStudies.map((c, i) => (
                    <ScrollReveal key={c.brand} delay={(i % 2) * 90}>
                        <Link
                            to={`/case-studies#${c.brand.toLowerCase()}`}
                            className="group flex h-full min-h-[440px] flex-col justify-between rounded-lg border border-bone/12 bg-[#0c0b09] p-7 transition-colors duration-300 hover:border-amber/50 sm:p-9"
                        >
                            <div className="flex items-center justify-between">
                                <span className="label text-[10px] text-copper">0{i + 1} — {c.brand}</span>
                                <span className="label text-[10px] text-stone">{c.sector}</span>
                            </div>

                            <div className="my-10">
                                <Metric value={c.metric} />
                                <p className="label mt-5 text-[10.5px] text-amber">{c.unit}</p>
                            </div>

                            <div>
                                <h3 className="display display-md max-w-[22ch]">{c.title}</h3>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {c.stack.map((t) => (
                                        <li key={t} className="label rounded border border-bone/12 px-2.5 py-1.5 text-[9.5px] text-bone/60">{t}</li>
                                    ))}
                                </ul>
                                <span className="label mt-7 inline-flex items-center gap-2 text-[10.5px] text-bone transition-colors group-hover:text-amber">
                                    View Case Study <IconArrowUpRight size={13} />
                                </span>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>

            {/* Execution photography */}
            <div className="mt-24">
                <ScrollReveal className="flex items-end justify-between gap-6 border-b border-bone/12 pb-4">
                    <h3 className="display display-md">Execution, <span className="text-bone/45">not slides.</span></h3>
                    <span className="label hidden text-stone sm:block">On the ground</span>
                </ScrollReveal>
                <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {executionPhotos.map((p, i) => (
                        <ScrollReveal key={p.src} delay={i * 80}>
                            <figure className="photo-card relative aspect-[4/5] overflow-hidden rounded-lg border border-bone/12">
                                <img src={p.src} alt={p.alt} loading="lazy" className="photo-grade h-full w-full object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                                <figcaption className="label absolute bottom-4 left-4 text-[10px] text-bone/85">{p.caption}</figcaption>
                            </figure>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <ScrollReveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-bone/12 pt-8 md:flex-row md:items-center">
                <p className="label text-[10.5px] text-stone">Tell us the outcome. We’ll engineer the distribution.</p>
                <BookCall section="case-studies" variant="bone" />
            </ScrollReveal>
        </Container>
    </section>
);

export default CaseStudies;
