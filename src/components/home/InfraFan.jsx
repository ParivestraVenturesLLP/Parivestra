import React, { useRef } from 'react';
import { useScrollProgress, seg, ease } from '../../hooks/useScrollProgress';
import { infraIcons } from '../ui/icons';
import { infrastructure } from '../../content/homeContent';

// One big tile splits into seven modules along an arc — Quantara's "Integration" scene,
// carrying Parivestra's seven infrastructure channels.
const InfraFan = () => {
    const ref = useRef(null);
    const p = useScrollProgress(ref);
    const spread = ease(seg(p, 0.12, 0.7));
    const label = seg(p, 0.72, 0.9);
    const n = infrastructure.length;
    const mid = (n - 1) / 2;

    return (
        <section id="infrastructure" ref={ref} className="relative scroll-mt-0" style={{ height: '340vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-x-0 top-[17%] text-center" style={{ opacity: seg(p, 0.08, 0.22) }}>
                    <span className="label rounded border border-bone/12 bg-bone/[0.04] px-3 py-1.5 text-[10px] text-bone/80">
                        Infrastructure <span className="text-stone">— Active modules</span>
                    </span>
                </div>

                <div className="absolute left-1/2 top-[54%] h-0 w-0">
                    {infrastructure.map((m, i) => {
                        const Icon = infraIcons[m.id];
                        const d = i - mid;
                        const isMid = d === 0;
                        const x = d * spread * (typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 158);
                        const y = Math.abs(d) * Math.abs(d) * spread * 16;
                        const rot = d * 7 * spread;
                        const scale = isMid ? 1 + (1 - spread) * 1.5 : 0.7 + spread * 0.3;
                        const opacity = isMid ? 1 : seg(p, 0.1, 0.3);
                        return (
                            <div
                                key={m.id}
                                className="absolute"
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(${scale})`,
                                    opacity,
                                    zIndex: isMid ? 5 : 4 - Math.abs(d),
                                }}
                            >
                                <div className="flex h-[clamp(64px,9vw,116px)] w-[clamp(64px,9vw,116px)] items-center justify-center rounded-[22%] border border-bone/12 bg-[#191714] shadow-[0_20px_50px_-20px_rgba(0,0,0,.9)]">
                                    <Icon size={44} className="h-[46%] w-[46%] text-bone" strokeWidth={1.25} />
                                </div>
                                <p className="label mt-3 text-center text-[9px] text-bone/65" style={{ opacity: seg(p, 0.55, 0.75) }}>{m.name}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="absolute inset-x-0 bottom-[14%] px-6 text-center" style={{ opacity: label, transform: `translateY(${(1 - label) * 14}px)` }}>
                    <p className="display display-md mx-auto max-w-[24ch] text-balance">
                        Connected channels. <span className="text-bone/45">One outcome layer.</span>
                    </p>
                    <p className="label mt-5 text-[10px] text-stone">Communities × Creators × Offline × Digital × Data × AI</p>
                </div>
            </div>
        </section>
    );
};

export default InfraFan;
