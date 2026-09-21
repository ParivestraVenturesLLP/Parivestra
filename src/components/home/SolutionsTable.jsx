import React from 'react';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { Container } from './shared';
import ScrollReveal from '../ScrollReveal';
import { IconCheck, IconArrow, outcomeIcons } from '../ui/icons';
import { solutions, objectiveFor } from '../../content/homeContent';

// Modelled on Quantara's tier table: hairline-bordered columns on a dotted field,
// one column per solution, big name, one action, "Key features" list.
const SolutionsTable = () => (
    <section id="solutions" className="relative scroll-mt-16 py-28 lg:py-40">
        <Container>
            <ScrollReveal className="text-center">
                <span className="label text-stone">Solutions</span>
                <h2 className="display display-lg mx-auto mt-5 max-w-[18ch] text-balance">
                    Solutions engineered <span className="text-bone/40">around one outcome.</span>
                </h2>
            </ScrollReveal>

            <ScrollReveal delay={100} className="mt-16">
                <div className="dot-field grid overflow-hidden rounded-lg border border-bone/14 bg-[#0c0b09] sm:grid-cols-2 lg:grid-cols-5">
                    {solutions.map((s, i) => {
                        const Icon = outcomeIcons[s.outcome.toLowerCase()];
                        return (
                            <article key={s.id} className="flex flex-col border-b border-bone/12 p-6 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r">
                                <div className="flex items-center justify-between">
                                    <span className="label text-[10px] text-copper">0{i + 1}</span>
                                    <Icon size={18} className="text-bone/50" />
                                </div>
                                <p className="mt-8 text-[14px] text-bone/60">Outcome · {s.outcome}</p>
                                <h3 className="display mt-1 min-h-[2.15em] text-[clamp(1.9rem,2.4vw,2.4rem)] leading-[1.05]">{s.name}</h3>
                                <p className="mt-3 min-h-[3.4em] text-[14px] leading-snug text-bone/55">{s.promise}</p>

                                <Link
                                    to={`/book-a-call?objective=${encodeURIComponent(objectiveFor[s.outcome])}`}
                                    onClick={() => { try { track('book_a_call_click', { section: `solution-${s.id}` }); } catch { /* noop */ } }}
                                    className="label mt-6 flex h-10 items-center justify-center rounded border border-bone/14 bg-bone/[0.05] text-[10px] text-bone transition-colors hover:border-amber hover:text-amber"
                                >
                                    Book a Call
                                </Link>

                                <p className="mt-8 text-[14px] text-bone/85">Key infrastructure</p>
                                <ul className="mt-3 space-y-2">
                                    {s.points.map((pt) => (
                                        <li key={pt} className="flex items-start gap-2 text-[12.5px] leading-snug text-bone/55">
                                            <IconCheck size={12} className="mt-[3px] shrink-0 text-amber" />{pt}
                                        </li>
                                    ))}
                                </ul>

                                <Link to={`/solutions/${s.id}`} className="label mt-auto inline-flex items-center gap-2 pt-8 text-[10px] text-stone transition-colors hover:text-amber">
                                    Explore {s.name} <IconArrow size={12} />
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </ScrollReveal>
        </Container>
    </section>
);

export default SolutionsTable;
