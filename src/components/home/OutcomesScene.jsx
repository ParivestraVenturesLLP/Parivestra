import React, { useRef } from 'react';
import { useScrollProgress, seg } from '../../hooks/useScrollProgress';
import { glyphs } from '../ui/icons';
import ScrambleText from '../ui/ScrambleText';
import BookCall from '../ui/BookCall';
import { outcomes } from '../../content/homeContent';

/* ── Isometric helpers ─────────────────────────────────────── */
const K = 64;
const C = Math.cos(Math.PI / 6);
const P = (x, y, z) => [(x - y) * C * K, (x + y) * 0.5 * K - z * K];
const poly = (pts) => pts.map(([x, y, z]) => P(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ');
const faces = (x0, y0, z0, x1, y1, z1) => ({
    top: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]],
    right: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]],
    left: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]],
});

// A "die-five" layout on a 3×3 tray — one tile per outcome.
const CELLS = [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]];
const TRAY_Z = 0.5;
const TILE = 0.76;

const Tile = ({ cell, id, active, lit }) => {
    const [cx, cy] = [cell[0] + 0.5, cell[1] + 0.5];
    const h = active ? 0.2 : 0.14;
    const f = faces(cx - TILE / 2, cy - TILE / 2, TRAY_Z, cx + TILE / 2, cy + TILE / 2, TRAY_Z + h);
    const z1 = TRAY_Z + h;
    const ki = (0.5 * K) / 24;
    const [px, py] = P(cx, cy, z1);
    const M = `matrix(${C * ki} ${0.5 * ki} ${-C * ki} ${0.5 * ki} ${px} ${py - 12 * ki})`;
    const layers = active ? 3 : 1;

    return (
        <g
            style={{
                transform: `translateY(${active ? -34 : lit ? -4 : 0}px)`,
                transition: 'transform .7s cubic-bezier(.2,.7,.2,1)',
            }}
        >
            {/* soft shadow the tile leaves in its slot */}
            <polygon
                points={poly(faces(cx - TILE / 2, cy - TILE / 2, TRAY_Z, cx + TILE / 2, cy + TILE / 2, TRAY_Z).top)}
                fill="#D88A43"
                style={{ opacity: active ? 0.16 : 0, transition: 'opacity .7s ease', transform: 'translateY(34px)' }}
            />
            <g strokeLinejoin="round" strokeWidth="1.1" stroke={active ? 'rgba(216,138,67,.8)' : 'rgba(239,231,219,.14)'} style={{ transition: 'stroke .5s ease' }}>
                <polygon points={poly(f.left)} fill="#1c1813" />
                <polygon points={poly(f.right)} fill="#13110e" />
                <polygon points={poly(f.top)} fill={active ? '#2b231a' : '#25211b'} style={{ transition: 'fill .5s ease' }} />
            </g>
            {/* dashed inner border, as on Quantara's tiles */}
            <polygon
                points={poly(faces(cx - TILE / 2 + 0.08, cy - TILE / 2 + 0.08, z1, cx + TILE / 2 - 0.08, cy + TILE / 2 - 0.08, z1).top)}
                fill="none"
                stroke="rgba(239,231,219,.22)"
                strokeWidth="1"
                strokeDasharray="2 3"
            />
            {/* extruded glyph: stacked copies fake the depth */}
            {Array.from({ length: layers }).map((_, i) => {
                const top = i === layers - 1;
                return (
                    <g key={i} transform={`translate(0 ${active ? -i * 1.4 : 0})`}>
                        <g
                            transform={M}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke={active ? (top ? '#F0A45C' : i % 2 ? '#7a4321' : '#96552c') : 'rgba(239,231,219,.45)'}
                            strokeWidth={active ? 2 : 1.6}
                            opacity={active ? 1 : lit ? 0.95 : 0.75}
                        >
                            {glyphs[id]}
                        </g>
                    </g>
                );
            })}
        </g>
    );
};

const Tray = ({ active, reveal }) => {
    const tray = faces(-0.35, -0.35, 0, 3.35, 3.35, TRAY_Z);
    const order = CELLS.map((c, i) => ({ c, i })).sort((a, b) => a.c[0] + a.c[1] - (b.c[0] + b.c[1]));
    return (
        <svg viewBox="-235 -140 470 390" className="h-full w-full" role="img" aria-label="Isometric tray with five tiles: Acquire, Transact, Launch, Engage and Scale.">
            {/* ground grid */}
            <g stroke="rgba(239,231,219,.05)" strokeWidth="1">
                {Array.from({ length: 9 }).map((_, i) => {
                    const t = -1 + i * 0.6;
                    const a = P(t, -1, 0), b = P(t, 4.4, 0), c = P(-1, t, 0), d = P(4.4, t, 0);
                    return <g key={i}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} /><line x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} /></g>;
                })}
            </g>
            <g strokeLinejoin="round" strokeWidth="1.2" stroke="rgba(239,231,219,.16)" style={{ opacity: 0.35 + 0.65 * reveal }}>
                <polygon points={poly(tray.left)} fill="#15130f" />
                <polygon points={poly(tray.right)} fill="#0f0d0b" />
                <polygon points={poly(tray.top)} fill="#1a1712" />
            </g>
            {/* slots */}
            {CELLS.map(([x, y], i) => (
                <polygon
                    key={i}
                    points={poly(faces(x + 0.06, y + 0.06, TRAY_Z, x + 0.94, y + 0.94, TRAY_Z).top)}
                    fill="#100e0b"
                    stroke={i === active ? 'rgba(216,138,67,.7)' : 'rgba(239,231,219,.2)'}
                    strokeDasharray="3 4"
                    style={{ transition: 'stroke .5s ease' }}
                />
            ))}
            {order.map(({ c, i }) => (
                <Tile key={outcomes[i].id} cell={c} id={outcomes[i].id} active={i === active} lit={i < active} />
            ))}
        </svg>
    );
};

/* ── Scene ──────────────────────────────────────────────────── */
const OutcomesScene = () => {
    const ref = useRef(null);
    const p = useScrollProgress(ref);
    const n = outcomes.length;
    const intro = 1 - seg(p, 0.05, 0.14);
    const stepP = seg(p, 0.12, 0.98);
    const started = p > 0.13;
    const active = started ? Math.min(n - 1, Math.floor(stepP * n)) : -1;
    const o = outcomes[Math.max(0, active)];
    const lit = Math.round(stepP * 16);

    return (
        <section id="outcomes" ref={ref} className="relative scroll-mt-0" style={{ height: '620vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* plus grid */}
                <div className="absolute left-5 top-24 hidden grid-cols-4 gap-x-3 gap-y-2.5 font-mono text-[15px] leading-none sm:left-10 sm:top-28 sm:grid" aria-hidden="true">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} className="transition-colors duration-500" style={{ color: i < lit ? '#D88A43' : 'rgba(239,231,219,.55)' }}>+</span>
                    ))}
                </div>

                <span className="label absolute left-1/2 top-24 -translate-x-1/2 text-stone sm:top-28">Outcomes</span>
                <span className="label absolute right-5 top-24 hidden text-stone/70 sm:right-10 sm:top-28 sm:block">
                    <ScrambleText text={`OUT-0${Math.max(0, active) + 1}/0${n}`} />
                </span>

                {/* intro title */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-[17%] px-6 text-center sm:top-[19%]"
                    style={{ opacity: intro, transform: `translateY(${(1 - intro) * -20}px)` }}
                >
                    <h2 className="display display-lg mx-auto max-w-[16ch] text-balance">
                        Don’t buy channels. <span className="text-bone/45">Buy outcomes.</span>
                    </h2>
                </div>

                {/* tray */}
                <div className="absolute left-1/2 top-[58%] h-[min(62vh,600px)] w-[min(94vw,860px)] -translate-x-1/2 -translate-y-1/2 sm:left-[38%] lg:left-[36%]">
                    <Tray active={active} reveal={seg(p, 0, 0.12)} />
                </div>

                {/* step rail */}
                <ol className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center sm:left-10 sm:flex" aria-label="Outcomes">
                    {outcomes.map((x, i) => (
                        <li key={x.id} className="flex flex-col items-center">
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[12px] transition-all duration-500"
                                style={{
                                    background: i === active ? '#EFE7DB' : 'transparent',
                                    color: i === active ? '#11100E' : i < active ? '#EFE7DB' : 'rgba(239,231,219,.4)',
                                    borderColor: i <= active ? 'rgba(239,231,219,.6)' : 'rgba(239,231,219,.18)',
                                }}
                            >
                                0{i + 1}
                            </span>
                            {i < n - 1 && <span className="h-7 w-px bg-bone/20" />}
                        </li>
                    ))}
                </ol>

                {/* copy */}
                {started && (
                <div
                    key={o.id}
                    className="fade-up absolute inset-x-0 bottom-24 px-6 text-center sm:bottom-auto sm:left-auto sm:right-10 sm:top-1/2 sm:w-[min(34vw,440px)] sm:-translate-y-1/2 sm:px-0 sm:text-right"
                    
                >
                    <p className="label mb-4 text-copper">Outcome 0{Math.max(0, active) + 1}</p>
                    <h3 className="display text-[clamp(2.4rem,5vw,4.5rem)]">{o.name}</h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-bone/60">{o.promise}</p>
                    <div className="mt-8 hidden flex-wrap justify-end gap-x-10 gap-y-3 sm:flex">
                        <div className="text-right">
                            <p className="label text-[10px] text-stone">Infrastructure</p>
                            <p className="label mt-2 max-w-[220px] text-[10px] leading-relaxed text-bone/70">
                                <ScrambleText text={o.infra.join(' · ').toUpperCase()} />
                            </p>
                        </div>
                    </div>
                </div>
                )}
                <div className="absolute bottom-6 right-5 hidden sm:right-10 sm:block" style={{ opacity: seg(p, 0.9, 0.98) }}>
                    <BookCall section="outcomes" size="sm" />
                </div>
            </div>
        </section>
    );
};

export default OutcomesScene;
