import React, { useMemo, useRef } from 'react';
import { useScrollProgress, seg, ease } from '../../hooks/useScrollProgress';
import ScrambleText from '../ui/ScrambleText';
import { outcomeNodes } from '../../content/homeContent';

const lerp = (a, b, t) => a + (b - a) * t;

/* Donut of five outcome segments that fill in as touchpoints get attributed. */
const Donut = ({ r }) => {
    const R = 66, circ = 2 * Math.PI * R, arc = (circ * (72 - 8)) / 360;
    return (
        <svg viewBox="0 0 180 180" className="mx-auto h-[150px] w-[150px] lg:h-[190px] lg:w-[190px]" role="img" aria-label="Five outcome segments filling as touchpoints are attributed.">
            {outcomeNodes.map((n, i) => {
                const on = seg(r, i * 0.16, i * 0.16 + 0.2);
                return (
                    <circle
                        key={n}
                        cx="90" cy="90" r={R}
                        fill="none"
                        stroke={on > 0.5 ? '#D88A43' : '#4a4036'}
                        strokeOpacity={0.35 + on * 0.65}
                        strokeWidth="17"
                        strokeDasharray={`${arc} ${circ}`}
                        transform={`rotate(${-90 + i * 72 + 4} 90 90)`}
                        style={{ transition: 'stroke .4s ease, stroke-opacity .4s ease' }}
                    />
                );
            })}
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

const Scatter = ({ r }) => {
    const pts = useMemo(() => {
        let s = 11;
        const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
        return Array.from({ length: 70 }, (_, i) => {
            const t = i / 69;
            return { x0: 14 + rnd() * 272, y0: 10 + rnd() * 130, x1: 24 + t * 252, y1: 132 - t * 96 + (rnd() - 0.5) * 4, d: rnd() * 0.25 };
        });
    }, []);
    return (
        <svg viewBox="0 0 300 150" className="h-[120px] w-full lg:h-[150px]" role="img" aria-label="Scattered touchpoints aligning into one line.">
            <path d="M12 140H290M12 140V8" stroke="rgba(239,231,219,.14)" fill="none" />
            {pts.map((p, i) => {
                const t = ease(seg(r, p.d, p.d + 0.6));
                return <circle key={i} cx={lerp(p.x0, p.x1, t)} cy={lerp(p.y0, p.y1, t)} r="1.9" fill={t > 0.6 ? '#D88A43' : '#8C8175'} />;
            })}
            <path d="M24 132L276 36" stroke="#D88A43" strokeDasharray="3 4" fill="none" style={{ opacity: seg(r, 0.7, 1) }} />
        </svg>
    );
};

const MeshFeatures = () => {
    const ref = useRef(null);
    const p = useScrollProgress(ref);
    const t = seg(p, 0.1, 0.55);           // toggle
    const r = ease(seg(p, 0.18, 0.9));     // resolve
    const done = r > 0.98;

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
                                <Donut r={r} />
                                <p className="label mt-4 text-right text-[9px] text-stone">
                                    <ScrambleText text={done ? 'TOUCHPOINTS ATTRIBUTED' : 'TOUCHPOINTS ROUTING'} duration={400} />
                                </p>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <Card title="Consumer touchpoints" status="LIVE">
                                <div className="px-4 py-3 sm:py-5"><Gauge r={r} /></div>
                            </Card>
                        </div>

                        <div className="space-y-4">
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
                            <Card title="Convergence" className="hidden lg:block">
                                <div className="px-3 py-2"><Scatter r={r} /></div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeshFeatures;
