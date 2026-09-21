import React from 'react';
import { Container, Frame } from './shared';
import ScrollReveal from '../ScrollReveal';
import CoverageMap from '../ui/CoverageMap';

const rows = [
    { k: 'On the ground', v: 'Campuses, residential societies, retail, events and OOH across India.' },
    { k: 'Online', v: 'Digital, creator and community distribution that extends beyond India.' },
    { k: 'One layer', v: 'Every touchpoint, physical or digital, is measured against the same outcome.' },
];

const Coverage = () => (
    <section id="coverage" className="relative scroll-mt-16 py-28 lg:py-40">
        <Container>
            <ScrollReveal className="flex items-start justify-between gap-6 border-b border-bone/12 pb-5">
                <h2 className="display display-md max-w-[22ch]">Physical reach across India. <span className="text-bone/45">Digital reach beyond it.</span></h2>
                <span className="label text-stone">Coverage</span>
            </ScrollReveal>

            <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12">
                <ScrollReveal className="lg:col-span-4">
                    <dl className="flex h-full flex-col justify-between gap-10">
                        {rows.map((r, i) => (
                            <div key={r.k} className="border-t border-bone/12 pt-5">
                                <dt className="label flex items-center gap-3 text-[10.5px] text-copper">
                                    <span>0{i + 1}</span><span className="text-bone/80">{r.k}</span>
                                </dt>
                                <dd className="mt-3 text-[16px] leading-relaxed text-bone/60">{r.v}</dd>
                            </div>
                        ))}
                        <div className="label flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-bone/12 pt-5 text-[10px] text-stone">
                            <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber" /> Physical hub</span>
                            <span className="flex items-center gap-2"><i className="h-2 w-3 border-t border-dashed border-copper" /> Digital reach</span>
                        </div>
                    </dl>
                </ScrollReveal>

                <ScrollReveal delay={120} className="lg:col-span-8">
                    <Frame>
                        <div className="overflow-hidden rounded-lg border border-bone/12 bg-[#0c0b09]">
                            <CoverageMap className="h-[460px] sm:h-[600px] lg:h-[680px]" />
                        </div>
                    </Frame>
                </ScrollReveal>
            </div>
        </Container>
    </section>
);

export default Coverage;
