import React, { useRef } from 'react';
import { useScrollProgress, seg, ease } from '../../hooks/useScrollProgress';
import { outcomeNodes, touchpointChannels } from '../../content/homeContent';

/* Donut of five channel segments that fill in as touchpoints get attributed. */
const Donut = ({ items, on }) => {
    const R = 66, circ = 2 * Math.PI * R, arc = (circ * (72 - 8)) / 360;
    return (
        <svg viewBox="0 0 180 180" className="mx-auto h-[150px] w-[150px] lg:h-[190px] lg:w-[190px]" role="img" aria-label={`Five touchpoint channels — ${items.join(', ')} — filling as they are attributed.`}>
            {items.map((n, i) => (
                <circle
                    key={n}
                    cx="90" cy="90" r={R}
                    fill="none"
                    stroke={on[i] ? '#D88A43' : '#4a4036'}
                    strokeOpacity={on[i] ? 1 : 0.5}
                    strokeWidth="17"
                    strokeDasharray={`${arc} ${circ}`}
                    transform={`rotate(${-90 + i * 72 + 4} 90 90)`}
                    style={{ transition: 'stroke .4s ease, stroke-opacity .4s ease' }}
                />
            ))}
            <circle cx="90" cy="90" r="46" fill="none" stroke="rgba(239,231,219,.08)" />
        </svg>
    );
};

/* Tick-ring gauge — the "82" dial on Quantara, here counting consumer touchpoints. */
const Gauge = ({ r }) => {
    const N = 96;
    const lit = Math.round(r * N);
    return (
        <div className="relative mx-auto h-[140px] w-[140px] sm:h-[190px] sm:w-[190px] lg:h-[240px] lg:w-[240px]">
            <svg viewBox="0 0 240 240" className="absolute inset-0" aria-hidden="true">
                {Array.from({ length: N }).map((_, i) => {
                    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
                    const on = i < lit;
                    const r1 = on ? 106 : 108, r2 = 118;
                    return (
                        <line
                            key={i}
                            x1={120 + Math.cos(a) * r1} y1={120 + Math.sin(a) * r1}
                            x2={120 + Math.cos(a) * r2} y2={120 + Math.sin(a) * r2}
                            stroke={on ? '#D88A43' : 'rgba(239,231,219,.22)'}
                            strokeWidth={on ? 1.6 : 1}
                        />
                    );
                })}
                <circle cx="120" cy="120" r="92" fill="none" stroke="rgba(168,95,50,.55)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="display text-[clamp(1.9rem,4.4vw,4rem)] tabular-nums">{Math.round(300 * r)}M+</span>
                <span className="label mt-1 text-[9px] text-stone">Touchpoints</span>
            </div>
        </div>
    );
};

const Card = ({ title, status, children, className = '' }) => (
    <div className={`rounded-lg border border-bone/12 bg-[#0d0c0a] ${className}`}>
        <div className="flex items-center justify-between border-b border-bone/10 bg-bone/[0.03] px-4 py-2.5">
            <span className="text-[13.5px] text-bone/85">{title}</span>
            {status && <span className="label text-[9px] text-stone">{status}</span>}
        </div>
        {children}
    </div>
);

const MeshFeatures = () => {
    const ref = useRef(null);
    const p = useScrollProgress(ref);
    const t = seg(p, 0.1, 0.55);           // toggle
    const r = ease(seg(p, 0.18, 0.9));     // resolve
    const done = r > 0.98;
    const donutOn = touchpointChannels.map((_, i) => seg(r, i * 0.16, i * 0.16 + 0.2) > 0.5);

    return (
        <section id="consumer-mesh" ref={ref} className="relative" style={{ height: '420vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="mx-auto flex h-full max-w-[1240px] flex-col px-5 pb-8 pt-24 sm:px-8 lg:pt-28">
                    <div className="text-center">
                        <span className="label text-stone">Consumer Mesh</span>
                        <h2 className="display display-md mx-auto mt-4 max-w-[26ch] text-balance text-bone/90">
                            The infrastructure connecting consumer intent to measurable action.
                        </h2>
                    </div>

                    {/* toggle line */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:mt-8">
                        <span className="display text-[clamp(1.5rem,3.6vw,3.25rem)] transition-colors" style={{ color: t < 0.5 ? '#EFE7DB' : 'rgba(239,231,219,.55)' }}>Millions of touchpoints</span>
                        <span className="relative h-[34px] w-[64px] shrink-0 rounded-full border border-bone/20 bg-bone/5" aria-hidden="true">
                            <span
                                className="absolute left-[3px] top-[3px] h-[26px] w-[26px] rounded-full bg-bone"
                                style={{ transform: `translateX(${t * 30}px)`, background: t > 0.5 ? '#D88A43' : '#EFE7DB' }}
                            />
                        </span>
                        <span className="display text-[clamp(1.5rem,3.6vw,3.25rem)] transition-colors" style={{ color: t > 0.5 ? '#D88A43' : 'rgba(239,231,219,.35)' }}>One measurable outcome</span>
                    </div>

                    {/* dashboard cards */}
                    <div className="mt-6 grid flex-1 grid-cols-1 content-start gap-4 lg:mt-10 lg:grid-cols-[1.05fr_1fr_1fr] lg:items-start">
                        <Card title="Attribution" status={done ? 'ATTRIBUTED' : 'SCATTERED'} className="hidden lg:block">
                            <div className="px-4 py-6">
                                <Donut items={touchpointChannels} on={donutOn} />
                                <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5">
                                    {touchpointChannels.map((ch, i) => (
                                        <li key={ch} className="flex items-center gap-2 text-[12px]">
                                            <span
                                                className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
                                                style={{ background: donutOn[i] ? '#D88A43' : '#4a4036' }}
                                            />
                                            <span className={`truncate transition-colors duration-500 ${donutOn[i] ? 'text-bone/85' : 'text-bone/45'}`}>{ch}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <Card title="Consumer touchpoints" status="LIVE">
                                <div className="px-4 py-3 sm:py-5"><Gauge r={r} /></div>
                            </Card>
                        </div>

                        <Card title="Outcomes">
                            <ul className="divide-y divide-bone/8 px-4 py-1">
                                {outcomeNodes.map((n, i) => {
                                    const on = r > (i + 1) / 6;
                                    return (
                                        <li key={n} className="flex items-center justify-between py-2 text-[13.5px] text-bone/85">
                                            {n}
                                            <span
                                                className="label rounded border px-2 py-0.5 text-[9px] transition-colors duration-500"
                                                style={{ color: on ? '#D88A43' : '#8C8175', borderColor: on ? 'rgba(216,138,67,.5)' : 'rgba(239,231,219,.14)', background: on ? 'rgba(168,95,50,.14)' : 'transparent' }}
                                            >
                                                {on ? 'Attributed' : 'Pending'}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeshFeatures;
