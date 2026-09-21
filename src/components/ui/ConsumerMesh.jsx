import React, { useEffect, useRef } from 'react';
import { outcomeNodes } from '../../content/homeContent';

const COPPER = '#A85F32';
const AMBER = '#D88A43';
const BONE = '#EFE7DB';
const STONE = '#8C8175';

// Deterministic PRNG so the mesh looks identical on every load (and in the static frame).
const seeded = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const gauss = (r) => (r() + r() + r() + r() - 2) / 2; // ~N(0, 0.4)

const lowPower = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    navigator.connection?.saveData === true;

const quad = (p0, p1, p2, t) => {
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
};

const ConsumerMesh = ({ className = '' }) => {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const isStatic = lowPower();

        let w = 0, h = 0, dpr = 1;
        let nodes = [], field = [], movers = [], lanes = [];
        let fieldLayer = null;
        let raf = 0, visible = true, last = 0, clock = 0;

        const build = () => {
            const rand = seeded(20260920);
            const small = w < 640;
            const labelW = small ? 88 : 92;
            const nodeX = w - labelW - (small ? 22 : 40);
            const padY = small ? h * 0.1 : h * 0.12;
            const step = (h - padY * 2) / (outcomeNodes.length - 1);
            nodes = outcomeNodes.map((label, i) => ({ label, x: nodeX, y: padY + step * i }));

            // Touchpoint clusters: campuses, societies, creators, stores, events…
            // Ranked top-to-bottom and assigned to outcome nodes in the same order, so the
            // lanes fan in cleanly instead of crossing.
            const clusterCount = small ? 10 : 15;
            const clusters = Array.from({ length: clusterCount }, () => ({
                x: w * (0.04 + rand() * 0.52),
                y: h * (0.08 + rand() * 0.84),
                r: w * (0.035 + rand() * 0.05),
            })).sort((a, b) => a.y - b.y);
            clusters.forEach((c, i) => { c.node = Math.min(nodes.length - 1, Math.floor((i * nodes.length) / clusterCount)); });

            const fieldCount = small ? 1400 : 4200;
            field = Array.from({ length: fieldCount }, () => {
                const c = clusters[Math.floor(rand() * clusters.length)];
                const warm = rand() < 0.22;
                return {
                    x: Math.min(w * 0.64, Math.max(4, c.x + gauss(rand) * c.r * 2.4)),
                    y: Math.min(h - 4, Math.max(4, c.y + gauss(rand) * c.r * 2.4)),
                    a: 0.35 + rand() * 0.5,
                    s: rand() < 0.12 ? 2 : 1.3,
                    warm,
                    c,
                };
            });

            const moverCount = small ? 320 : 900;
            movers = Array.from({ length: moverCount }, () => {
                const f = field[Math.floor(rand() * field.length)];
                const node = nodes[f.c.node];
                return {
                    p0: [f.x, f.y],
                    p1: [node.x - w * (small ? 0.2 : 0.24), node.y + (rand() - 0.5) * step * 0.3],
                    p2: [node.x, node.y + (rand() - 0.5) * 3],
                    t: rand(),
                    v: 0.05 + rand() * 0.07,
                    s: 1.4 + rand() * 1.1,
                };
            });

            lanes = clusters.map((c) => {
                const node = nodes[c.node];
                return { p0: [c.x, c.y], p1: [node.x - w * (small ? 0.2 : 0.24), node.y], p2: [node.x, node.y] };
            });

            // Static layer: origin field + faint lanes, drawn once per resize.
            fieldLayer = document.createElement('canvas');
            fieldLayer.width = w * dpr;
            fieldLayer.height = h * dpr;
            const fctx = fieldLayer.getContext('2d');
            fctx.scale(dpr, dpr);
            fctx.strokeStyle = COPPER;
            fctx.lineWidth = 1;
            fctx.globalAlpha = 0.28;
            lanes.forEach((l) => {
                fctx.beginPath();
                fctx.moveTo(l.p0[0], l.p0[1]);
                fctx.quadraticCurveTo(l.p1[0], l.p1[1], l.p2[0], l.p2[1]);
                fctx.stroke();
            });
            field.forEach((f) => {
                fctx.fillStyle = f.warm ? COPPER : STONE;
                fctx.globalAlpha = f.a;
                fctx.fillRect(f.x, f.y, f.s, f.s);
            });
        };

        const draw = (time) => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(fieldLayer, 0, 0, w, h);

            // moving touchpoints: copper on the way out, amber as they converge
            [[COPPER, 0, 0.55], [AMBER, 0.55, 1]].forEach(([color, lo, hi]) => {
                ctx.fillStyle = color;
                for (const m of movers) {
                    if (m.t < lo || m.t >= hi) continue;
                    const e = m.t * m.t * (3 - 2 * m.t);
                    const [x, y] = quad(m.p0, m.p1, m.p2, e);
                    const fade = Math.min(1, m.t / 0.08) * Math.min(1, (1 - m.t) / 0.07);
                    ctx.globalAlpha = 0.85 * fade;
                    ctx.fillRect(x - m.s / 2, y - m.s / 2, m.s * (1 + m.t), m.s * (1 + m.t));
                }
            });
            ctx.globalAlpha = 1;

            // outcome nodes
            const small = w < 640;
            ctx.font = `500 ${small ? 9 : 10.5}px "JetBrains Mono", monospace`;
            if ('letterSpacing' in ctx) ctx.letterSpacing = '1.4px';
            ctx.textBaseline = 'middle';
            nodes.forEach((n, i) => {
                const pulse = ((time * 0.45 + i * 0.21) % 1);
                ctx.strokeStyle = AMBER;
                ctx.globalAlpha = (1 - pulse) * 0.45;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 7 + pulse * 15, 0, Math.PI * 2);
                ctx.stroke();

                ctx.globalAlpha = 1;
                ctx.strokeStyle = AMBER;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = AMBER;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = BONE;
                ctx.globalAlpha = 0.9;
                ctx.fillText(n.label.toUpperCase(), n.x + 16, n.y + 0.5);
                ctx.globalAlpha = 1;
            });
        };

        const frame = (now) => {
            raf = requestAnimationFrame(frame);
            if (!visible || document.hidden) { last = now; return; }
            const dt = Math.min(0.05, (now - last) / 1000 || 0);
            last = now;
            clock += dt;
            for (const m of movers) { m.t += m.v * dt; if (m.t >= 1) m.t -= 1; }
            draw(clock);
        };

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            if (!r.width || !r.height) return;
            dpr = Math.min(2, window.devicePixelRatio || 1);
            w = r.width; h = r.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            build();
            draw(0.3);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(wrap);
        resize();

        let io;
        if (!isStatic) {
            io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
            io.observe(wrap);
            raf = requestAnimationFrame((t) => { last = t; frame(t); });
        }

        return () => { cancelAnimationFrame(raf); ro.disconnect(); io?.disconnect(); };
    }, []);

    return (
        <div ref={wrapRef} className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                role="img"
                aria-label="Consumer Mesh: thousands of consumer touchpoints converging into five measurable outcomes — Sale, Lead, Signup, Transaction and Footfall."
                className="absolute inset-0 h-full w-full"
            />
        </div>
    );
};

export default ConsumerMesh;
