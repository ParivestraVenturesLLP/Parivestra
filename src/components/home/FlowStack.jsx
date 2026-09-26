import React, { useRef } from 'react';
import { useScrollProgress, seg } from '../../hooks/useScrollProgress';
import { glyphs } from '../ui/icons';
import ScrambleText from '../ui/ScrambleText';
import { flow } from '../../content/homeContent';

const K = 74;
const C = Math.cos(Math.PI / 6);
const P = (x, y, z) => [(x - y) * C * K, (x + y) * 0.5 * K - z * K];
const poly = (pts) => pts.map(([x, y, z]) => P(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ');

const W = 1.5;      // plate width / height
const T = 0.2;      // plate thickness
const GAP = 0.72;   // spacing along the depth axis
const PULL = 1.15;   // how far the active plate slides toward the viewer

const Plate = ({ id, i, active, done }) => {
    const y0 = -i * GAP, y1 = y0 + T;
    const [ox, oy] = P(0, y1, W);
    const pull = active ? PULL : 0;
    const shift = `translate(${(-C * K * pull).toFixed(1)}px, ${(0.5 * K * pull).toFixed(1)}px)`;
    const edge = active ? 'rgba(216,138,67,.85)' : 'rgba(239,231,219,.16)';
    const layers = active ? 4 : 1;

    return (
        <g style={{ transform: shift, transition: 'transform .8s cubic-bezier(.2,.7,.2,1)' }}>
            <g strokeLinejoin="round" strokeWidth="1.1" stroke={edge} style={{ transition: 'stroke .5s ease' }}>
                {/* thin side + top edges — only on the pulled-forward active plate, where the
                    thickness reads as a raised card. On the receded stack these slivers have
                    no neighbouring plate to blend into and show up as a stray floating line. */}
                {active && (
                    <>
                        <polygon points={poly([[W, y0, 0], [W, y1, 0], [W, y1, W], [W, y0, W]])} fill="#100e0b" />
                        <polygon points={poly([[0, y0, W], [W, y0, W], [W, y1, W], [0, y1, W]])} fill="#26211b" />
                    </>
                )}
                {/* big face */}
                <g transform={`matrix(${C * K} ${0.5 * K} 0 ${K} ${ox} ${oy})`}>
                    <rect width={W} height={W} rx="0.2" fill={active ? '#1f1911' : '#1a1712'} vectorEffect="non-scaling-stroke" />
                    <rect x="0.13" y="0.13" width={W - 0.26} height={W - 0.26} rx="0.12" fill="none" stroke="rgba(239,231,219,.28)" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" strokeWidth="1" />
                </g>
            </g>
            {/* glyph, extruded when active */}
            {Array.from({ length: layers }).map((_, l) => {
                const top = l === layers - 1;
                const d = l * 0.05;
                return (
                    <g key={l} transform={`translate(${(-C * K * d).toFixed(2)} ${(0.5 * K * d).toFixed(2)})`}>
                        <g transform={`matrix(${C * K} ${0.5 * K} 0 ${K} ${ox} ${oy})`}>
                            <g
                                transform={`translate(${(W - 0.85) / 2} ${(W - 0.85) / 2}) scale(${0.85 / 24})`}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                stroke={active ? (top ? '#F0A45C' : l % 2 ? '#7a4321' : '#96552c') : done ? 'rgba(216,138,67,.65)' : 'rgba(239,231,219,.4)'}
                            >
                                {glyphs[id]}
                            </g>
                        </g>
                    </g>
                );
            })}
        </g>
    );
};

const Ruler = ({ pct }) => (
    <div className="pointer-events-none relative h-[46vh] w-6" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="absolute left-0 h-px bg-bone/25" style={{ top: `${(i / 29) * 100}%`, width: i % 5 === 0 ? 14 : 8 }} />
        ))}
        <span className="absolute -left-1 h-[2px] w-[22px] bg-amber transition-[top] duration-500" style={{ top: `${pct * 100}%` }} />
    </div>
);

const FlowStack = () => {
    const ref = useRef(null);
    const p = useScrollProgress(ref);
    const n = flow.length;
    const stepP = seg(p, 0.06, 0.97);
    const active = Math.min(n - 1, Math.floor(stepP * n));
    const step = flow[active];

    return (
        <section id="flow" ref={ref} className="relative" style={{ height: '600vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden bg-ink">
                {/* copper aurora inside a large circle, as on Quantara's workflow scene */}
                <div className="absolute -left-[38vh] top-1/2 h-[128vh] w-[128vh] -translate-y-1/2 overflow-hidden rounded-full" aria-hidden="true">
                    <div className="aurora absolute -inset-10 opacity-90" />
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 60% 50%, transparent 30%, #11100E 78%)' }} />
                </div>

                <div className="absolute inset-x-0 top-24 text-center sm:top-28">
                    <span className="label text-[10px] text-bone/70">
                        <ScrambleText text={`CONSUMER MESH >>> FLOW [0${n}]`} duration={700} />
                    </span>
                </div>

                {/* stack */}
                <div className="absolute right-[-6vw] top-[52%] h-[min(62vh,640px)] w-[min(100vw,780px)] -translate-y-1/2 sm:right-[2vw] lg:right-[4vw]">
                    <svg viewBox="-80 -235 390 340" className="h-full w-full overflow-visible" role="img" aria-label="Five stacked plates: Consumer, Intent, Distribution, Engagement, Transaction.">
                        {[...flow].map((f, i) => ({ f, i })).sort((a, b) => (a.i === active) - (b.i === active) || b.i - a.i).map(({ f, i }) => (
                            <Plate key={f.id} id={f.id} i={i} active={i === active} done={i < active} />
                        ))}
                    </svg>
                </div>

                {/* ruler + copy */}
                <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 sm:left-10 sm:block"><Ruler pct={stepP} /></div>
                <div
                    key={step.id}
                    className="fade-up absolute inset-x-0 bottom-20 px-6 sm:bottom-auto sm:left-24 sm:right-auto sm:top-1/2 sm:w-[min(34vw,460px)] sm:-translate-y-1/2 sm:px-0 lg:left-28"
                >
                    <span className="label mb-4 block text-[10px] text-copper">0{active + 1} / 0{n}</span>
                    <h3 className="display text-[clamp(2.4rem,5vw,4.6rem)]">{step.name}</h3>
                    <p className="mt-4 max-w-[36ch] text-[15.5px] leading-relaxed text-bone/60">{step.text}</p>
                </div>
            </div>
        </section>
    );
};

export default FlowStack;
