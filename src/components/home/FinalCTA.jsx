import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ScrollReveal';
import BookCall from '../ui/BookCall';
import { objectives } from '../../content/homeContent';

// Quantara's closing card: rounded, aurora-lit, one message, one button.
const FinalCTA = () => (
    <section id="book" className="relative px-3 pb-0 pt-10 sm:px-5">
        <ScrollReveal>
            <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] rounded-b-none border border-bone/10 bg-[#0c0b09] px-6 py-28 text-center sm:py-40">
                <div className="aurora pointer-events-none absolute inset-x-[-10%] bottom-[-30%] top-[10%] opacity-80" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 70% at 50% 100%, transparent, #0c0b09 85%)' }} aria-hidden="true" />

                <div className="relative">
                    <span className="label text-[10.5px] text-bone/60">Tell us the outcome</span>
                    <h2 className="display mx-auto mt-6 max-w-[16ch] text-balance text-[clamp(2.6rem,7vw,6.5rem)]">
                        Tell us the outcome. <span className="text-bone/70">We’ll engineer the distribution.</span>
                    </h2>

                    <p className="label mt-12 text-[10px] text-bone/60">What outcome are you trying to achieve?</p>
                    <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                        {objectives.map((o) => (
                            <li key={o}>
                                <Link
                                    to={`/book-a-call?objective=${encodeURIComponent(o)}`}
                                    className="label inline-block rounded-full border border-bone/25 bg-ink/40 px-5 py-2.5 text-[10.5px] text-bone transition-colors hover:border-amber hover:text-amber"
                                >
                                    {o}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10"><BookCall section="final-cta" variant="bone" size="lg" /></div>
                </div>
            </div>
        </ScrollReveal>
    </section>
);

export default FinalCTA;
