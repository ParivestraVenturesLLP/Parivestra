import React, { useEffect } from 'react';
import { PageShell, Wrap, Kicker } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import Counter from '../components/ui/Counter';
import { usePageMeta } from '../hooks/usePageMeta';
import { about, proof } from '../content/homeContent';

// About (plan §11): why Parivestra exists, operating philosophy, infrastructure advantage.
// Corporate history stays secondary to customer value.
const PariAbout = () => {
    usePageMeta({
        title: 'About | Parivestra — Outcome Infrastructure for Consumer Brands',
        description: 'Why Parivestra exists, how it operates, and the infrastructure advantage behind outcome-first consumer growth.',
        path: '/about',
    });

    useEffect(() => {
        if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'About Page' });
    }, []);

    return (
        <PageShell
            eyebrow="About"
            title="Why Parivestra exists."
            sub={about.why}
            actions={<BookCall section="about-hero" variant="bone" />}
        >
            <Wrap className="pb-24">
                <Kicker index="01" label="Operating philosophy" />
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {about.philosophy.map((p, i) => (
                        <div key={p.k} className="rounded-lg border border-bone/12 bg-[#0c0b09] p-8">
                            <span className="label text-[10px] text-copper">0{i + 1}</span>
                            <h3 className="display mt-10 text-[2.2rem]">{p.k}</h3>
                            <p className="mt-4 text-[15.5px] leading-relaxed text-bone/60">{p.v}</p>
                        </div>
                    ))}
                </div>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="02" label="The infrastructure advantage" />
                <p className="display display-md mt-10 max-w-[30ch]">
                    One outcome-first consumer growth layer, built from what we own and operate.
                </p>
                <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-3">
                    {about.advantage.map((a, i) => (
                        <li key={a} className="flex items-center gap-4 bg-ink px-6 py-6">
                            <span className="label text-[10px] text-copper">0{i + 1}</span>
                            <span className="text-[18px] text-bone/85">{a}</span>
                        </li>
                    ))}
                </ul>
            </Wrap>

            <Wrap className="pb-28">
                <Kicker index="03" label="Scale today" />
                <dl className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
                    {proof.map((pr, i) => (
                        <div key={pr.label} className={`md:px-10 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-bone/12'}`}>
                            <dd className="display text-[clamp(3rem,7vw,6rem)] leading-none"><Counter value={pr.value} prefix={pr.prefix} suffix={pr.suffix} /></dd>
                            <dt className="label mt-4 text-stone">{pr.label}</dt>
                        </div>
                    ))}
                </dl>
                <div className="mt-16 flex justify-center"><BookCall section="about-end" variant="bone" size="lg" /></div>
            </Wrap>
        </PageShell>
    );
};

export default PariAbout;
