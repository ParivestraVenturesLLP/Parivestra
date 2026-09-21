import React from 'react';
import { PageShell, Wrap, Kicker } from '../components/PageShell';
import BookCall from '../components/ui/BookCall';
import OutcomeFlow from '../components/ui/OutcomeFlow';
import CoverageMap from '../components/ui/CoverageMap';
import { infraIcons } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { infrastructure } from '../content/homeContent';

// Explains the Consumer Mesh and the channel ecosystem without making it the hero message (plan §11).
const PariInfrastructure = () => {
    usePageMeta({
        title: 'Infrastructure | The Parivestra Consumer Mesh',
        description: 'The infrastructure connecting consumer intent to measurable action: digital, communities, creators, offline, retail, data and AI.',
        path: '/infrastructure',
    });

    return (
        <PageShell
            eyebrow="Infrastructure"
            title="The infrastructure connecting consumer intent to measurable action."
            sub="Seven channel modules, one outcome layer."
            actions={<BookCall section="infrastructure-hero" variant="bone" />}
        >
            <Wrap className="pb-24">
                <Kicker index="01" label="The flow" />
                <div className="mt-14"><OutcomeFlow /></div>
            </Wrap>

            <Wrap className="pb-24">
                <Kicker index="02" label="Active modules" />
                <div className="mt-10 grid border-l border-t border-bone/12 sm:grid-cols-2 lg:grid-cols-4">
                    {infrastructure.map((m, i) => {
                        const Icon = infraIcons[m.id];
                        return (
                            <div key={m.id} className="group flex min-h-[230px] flex-col justify-between border-b border-r border-bone/12 p-7 transition-colors hover:bg-bone/[0.03]">
                                <div className="flex items-center justify-between">
                                    <span className="label text-[10px] text-stone">0{i + 1}</span>
                                    <span className="label flex items-center gap-2 text-[9px] text-copper"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper text-copper" />Active</span>
                                </div>
                                <Icon size={40} className="text-bone/80 transition-colors group-hover:text-amber" strokeWidth={1.25} />
                                <div>
                                    <h3 className="display text-[1.9rem]">{m.name}</h3>
                                    <p className="mt-2 text-[14px] text-bone/55">{m.text}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex min-h-[230px] flex-col justify-between border-b border-r border-bone/12 bg-bone/[0.04] p-7 sm:col-span-2 lg:col-span-1">
                        <span className="label text-[10px] text-stone">Capability line</span>
                        <p className="display text-[1.5rem] leading-tight">Communities × Creators × Offline × Digital × Data × <span className="text-amber">AI</span></p>
                        <span className="label text-[9px] text-stone">Powered by the Parivestra Consumer Mesh</span>
                    </div>
                </div>
            </Wrap>

            <Wrap className="pb-28">
                <Kicker index="03" label="Coverage" />
                <div className="mt-10 overflow-hidden rounded-lg border border-bone/12 bg-[#0c0b09]">
                    <CoverageMap className="h-[460px] sm:h-[620px]" />
                </div>
                <div className="mt-14 flex justify-center"><BookCall section="infrastructure-end" variant="bone" size="lg" /></div>
            </Wrap>
        </PageShell>
    );
};

export default PariInfrastructure;
