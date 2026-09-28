import React, { useRef } from 'react';
import { useScrollProgress, seg, ease } from '../../hooks/useScrollProgress';
import { outcomeNodes, touchpointChannels } from '../../content/homeContent';

// Every size below the section return is a clamp() that reacts to viewport HEIGHT
// (vh), not just width. This section is pinned to exactly one screen (h-screen +
// overflow-hidden), so on a short window — a laptop with Windows display scaling at
// 125–150%, or a browser that isn't tall — fixed px paddings/sizes were pushing the
// Attribution card's legend (and sometimes the cards themselves) below the visible
// area, where they were silently clipped instead of just looking cramped.

/* Donut with per-segment leader lines — each segment gets its own line breaking out
   of the ring to a named callout, like a proper analytics-dashboard pie chart, rather
   than a plain legend sitting underneath. Geometry is computed from the same angles
   used to draw the ring segments, so the leader line always meets its own wedge. */
const DONUT_CX = 185, DONUT_CY = 110, DONUT_R = 44, DONUT_SW = 15;
const DONUT_VB = '0 0 400 220';

const Donut = ({ items, on }) => {
    const circ = 2 * Math.PI * DONUT_R;
    const arcDeg = 72 - 10;
    const arcLen = (circ * arcDeg) / 360;

    const segs = items.map((name, i) => {
        const startDeg = -90 + i * 72 + 5;
        const mid = ((startDeg + arcDeg / 2) * Math.PI) / 180;
        const cos = Math.cos(mid), sin = Math.sin(mid);
        const side = cos >= 0 ? 1 : -1;
        const rOuter = DONUT_R + DONUT_SW / 2 + 2;
        const rElbow = rOuter + 22;
        const p0 = [DONUT_CX + cos * rOuter, DONUT_CY + sin * rOuter];
        const p1 = [DONUT_CX + cos * rElbow, DONUT_CY + sin * rElbow];
        const p2 = [p1[0] + side * 22, p1[1]];
        return { name, startDeg, p0, p1, p2, side };
    });

    return (
        <svg viewBox={DONUT_VB} className="aspect-[340/200] h-auto w-full" role="img" aria-label={`Donut chart with a leader line to each of five touchpoint channels — ${items.join(', ')} — filling in as they are attributed.`}>
            {items.map((n, i) => (
                <circle
                    key={n}
                    cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R}
                    fill="none"
                    stroke={on[i] ? '#D88A43' : '#4a4036'}
                    strokeOpacity={on[i] ? 1 : 0.5}
                    strokeWidth={DONUT_SW}
                    strokeDasharray={`${arcLen} ${circ}`}
                    transform={`rotate(${-90 + i * 72 + 5} ${DONUT_CX} ${DONUT_CY})`}
                    style={{ transition: 'stroke .4s ease, stroke-opacity .4s ease' }}
                />
            ))}
            <circle cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R - DONUT_SW / 2 - 7} fill="none" stroke="rgba(239,231,219,.08)" />
            {/* arrow emerging from the centre, reaching out toward the ring — attributed
                touchpoints trending up and out. */}
            <g transform={`translate(${DONUT_CX - 10} ${DONUT_CY - 10}) scale(0.83)`} fill="none" stroke="#D88A43" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M8 7h9v9" />
            </g>

            {/* leader line + name for every segment */}
            {segs.map((s, i) => {
                const active = on[i];
                const color = active ? '#D88A43' : 'rgba(239,231,219,.4)';
                return (
                    <g key={s.name} style={{ transition: 'opacity .5s ease' }} opacity={active ? 1 : 0.55}>
                        <path
                            d={`M${s.p0[0].toFixed(1)} ${s.p0[1].toFixed(1)} L${s.p1[0].toFixed(1)} ${s.p1[1].toFixed(1)} L${s.p2[0].toFixed(1)} ${s.p2[1].toFixed(1)}`}
                            fill="none"
                            stroke={color}
                            strokeWidth="1"
                        />
                        <circle cx={s.p0[0]} cy={s.p0[1]} r="2" fill={color} />
                        <circle cx={s.p2[0]} cy={s.p2[1]} r="1.6" fill={color} />
                        <text
                            x={s.p2[0] + s.side * 6}
                            y={s.p2[1]}
                            textAnchor={s.side === 1 ? 'start' : 'end'}
                            dominantBaseline="middle"
                            fontFamily="'JetBrains Mono', monospace"
                            fontSize="10.5"
                            fontWeight="500"
                            letterSpacing="0.04em"
                            fill={active ? '#EFE7DB' : 'rgba(239,231,219,.55)'}
                        >
                            {s.name.toUpperCase()}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

/* Tick-ring gauge — the "82" dial on Quantara, here counting consumer touchpoints. */
const Gauge = ({ r }) => {
    const N = 96;
    const lit = Math.round(r * N);
    return (
        <div className="relative mx-auto h-[clamp(92px,19vh,240px)] w-[clamp(92px,19vh,240px)]">
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
                <span className="display text-[clamp(1.2rem,min(4vw,5vh),4rem)] tabular-nums">{Math.round(300 * r)}M+</span>
                <span className="label mt-1 text-[9px] text-stone">Touchpoints</span>
            </div>
        </div>
    );
};

const Card = ({ title, status, children, className = '' }) => (
    <div className={`rounded-lg border border-bone/12 bg-[#0d0c0a] ${className}`}>
        <div className="flex items-center justify-between border-b border-bone/10 bg-bone/[0.03] px-4 py-[clamp(0.3rem,0.9vh,0.625rem)]">
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
                <div className="mx-auto flex h-full max-w-[1240px] flex-col px-5 pb-[clamp(0.5rem,2vh,2rem)] pt-[clamp(1.25rem,6vh,5.5rem)] sm:px-8">
                    <div className="text-center">
                        <span className="label text-stone">Consumer Mesh</span>
                        <h2 className="display mx-auto mt-[clamp(0.4rem,1.4vh,1rem)] max-w-[26ch] text-balance text-[clamp(1.05rem,min(2.6vw,4.2vh),2.6rem)] text-bone/90">
                            The infrastructure connecting consumer intent to measurable action.
                        </h2>
                    </div>

                    {/* toggle line */}
                    <div className="mt-[clamp(0.5rem,2vh,2rem)] flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <span className="display text-[clamp(1rem,min(3.4vw,4.4vh),3.25rem)] transition-colors" style={{ color: t < 0.5 ? '#EFE7DB' : 'rgba(239,231,219,.55)' }}>Millions of touchpoints</span>
                        <span className="relative h-[34px] w-[64px] shrink-0 rounded-full border border-bone/20 bg-bone/5" aria-hidden="true">
                            <span
                                className="absolute left-[3px] top-[3px] h-[26px] w-[26px] rounded-full bg-bone"
                                style={{ transform: `translateX(${t * 30}px)`, background: t > 0.5 ? '#D88A43' : '#EFE7DB' }}
                            />
                        </span>
                        <span className="display text-[clamp(1rem,min(3.4vw,4.4vh),3.25rem)] transition-colors" style={{ color: t > 0.5 ? '#D88A43' : 'rgba(239,231,219,.35)' }}>One measurable outcome</span>
                    </div>

                    {/* dashboard cards — three equal-width, equal-height boxes */}
                    <div className="mt-[clamp(0.5rem,2.4vh,2.5rem)] grid flex-1 grid-cols-1 content-start gap-[clamp(0.5rem,1.6vh,1rem)] lg:grid-cols-3 lg:items-stretch">
                        <Card title="Attribution" status={done ? 'ATTRIBUTED' : 'SCATTERED'} className="hidden lg:flex lg:flex-col">
                            <div className="flex flex-1 items-center px-4 py-[clamp(0.5rem,1.8vh,1.5rem)]">
                                <Donut items={touchpointChannels} on={donutOn} />
                            </div>
                        </Card>

                        <Card title="Consumer touchpoints" status="LIVE" className="flex flex-col">
                            <div className="flex flex-1 items-center justify-center px-4 py-[clamp(0.4rem,1.6vh,1.25rem)]"><Gauge r={r} /></div>
                        </Card>

                        <Card title="Outcomes" className="flex flex-col">
                            <ul className="flex flex-1 flex-col justify-center divide-y divide-bone/8 px-4 py-1">
                                {outcomeNodes.map((n, i) => {
                                    const on = r > (i + 1) / 6;
                                    return (
                                        <li key={n} className="flex items-center justify-between py-[clamp(0.25rem,0.8vh,0.5rem)] text-[13.5px] text-bone/85">
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
