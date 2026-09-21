import React, { useEffect, useRef } from 'react';

const COPPER = '#A85F32';
const AMBER = '#D88A43';
const BONE = '#EFE7DB';
const STONE = '#8C8175';

// Simplified outline of India (lon, lat), clockwise from the north.
const INDIA = [
    [77.8, 35.5], [79.6, 34.7], [80.3, 32.6], [78.9, 31.4], [80.2, 30.4], [80.1, 28.9], [82.0, 28.0], [84.1, 27.4],
    [86.0, 26.6], [88.1, 26.4], [88.1, 27.8], [88.9, 27.3], [89.9, 26.8], [92.1, 26.9], [92.8, 28.0], [95.2, 29.2],
    [97.3, 28.3], [96.2, 27.2], [97.1, 27.1], [95.6, 26.0], [94.6, 24.1], [93.4, 22.9], [92.4, 21.6], [92.1, 23.6],
    [91.2, 24.2], [89.9, 25.3], [89.0, 26.2], [88.6, 25.2], [88.3, 24.4], [88.9, 23.6], [89.0, 22.1], [88.2, 21.6],
    [87.0, 21.5], [86.8, 20.3], [85.1, 19.4], [84.0, 18.3], [82.3, 16.7], [81.0, 15.8], [80.3, 13.5], [79.8, 11.7],
    [79.4, 10.3], [78.2, 8.9], [77.5, 8.1], [76.5, 9.0], [75.6, 11.5], [74.7, 13.0], [73.8, 15.9], [72.8, 19.0],
    [72.7, 21.0], [72.0, 20.9], [70.5, 20.9], [69.0, 22.3], [68.2, 23.6], [68.9, 23.9], [70.4, 24.3], [71.0, 25.5],
    [70.1, 26.6], [70.3, 27.9], [72.0, 29.8], [74.5, 31.0], [74.9, 32.5], [74.0, 34.0], [75.4, 35.9],
];

// Major metro hubs shown as physical distribution nodes.
const HUBS = [
    { name: 'Delhi NCR', lon: 77.2, lat: 28.6, label: true },
    { name: 'Mumbai', lon: 72.9, lat: 19.1, label: true },
    { name: 'Bengaluru', lon: 77.6, lat: 12.97, label: true, side: 'l' },
    { name: 'Hyderabad', lon: 78.5, lat: 17.4, label: true },
    { name: 'Kolkata', lon: 88.4, lat: 22.6, label: true },
    { name: 'Chennai', lon: 80.3, lat: 13.1, label: true, side: 'r' },
    { name: 'Pune', lon: 73.9, lat: 18.5 },
    { name: 'Ahmedabad', lon: 72.6, lat: 23.0 },
    { name: 'Jaipur', lon: 75.8, lat: 26.9 },
    { name: 'Lucknow', lon: 80.9, lat: 26.85 },
    { name: 'Chandigarh', lon: 76.8, lat: 30.7 },
    { name: 'Guwahati', lon: 91.7, lat: 26.1 },
];

// Global digital links leave the map toward the frame edge (normalised canvas coords).
const ARCS = [
    { from: 'Delhi NCR', to: [0.05, 0.1], bend: [0.3, 0.0] },
    { from: 'Mumbai', to: [0.03, 0.55], bend: [0.16, 0.42] },
    { from: 'Guwahati', to: [0.97, 0.22], bend: [0.84, 0.05] },
    { from: 'Chennai', to: [0.95, 0.9], bend: [0.86, 0.72] },
];

const COS = 0.927;
const LON0 = 67.5, LAT0 = 37.5;
const MAP_W = (98.5 - LON0) * COS, MAP_H = LAT0 - 6.5;

const inside = (lon, lat) => {
    let c = false;
    for (let i = 0, j = INDIA.length - 1; i < INDIA.length; j = i++) {
        const [xi, yi] = INDIA[i], [xj, yj] = INDIA[j];
        if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
};

const lowPower = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    navigator.connection?.saveData === true;

const CoverageMap = ({ className = '' }) => {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const isStatic = lowPower();

        let w = 0, h = 0, dpr = 1, scale = 1, ox = 0, oy = 0;
        let dots = [], hubs = [], arcs = [], layer = null;
        let raf = 0, visible = true, last = 0, clock = 0;

        const project = (lon, lat) => [ox + (lon - LON0) * COS * scale, oy + (LAT0 - lat) * scale];

        const build = () => {
            scale = Math.min((w * 0.76) / MAP_W, (h * 0.9) / MAP_H);
            ox = w * 0.5 - (MAP_W * scale) / 2;
            oy = h * 0.54 - (MAP_H * scale) / 2;

            hubs = HUBS.map((hb) => ({ ...hb, pos: project(hb.lon, hb.lat) }));

            const step = 0.44;
            dots = [];
            for (let gx = 0; gx <= MAP_W; gx += step) {
                for (let gy = 0; gy <= MAP_H; gy += step) {
                    const lon = LON0 + gx / COS, lat = LAT0 - gy;
                    if (!inside(lon, lat)) continue;
                    // brighter near hubs → reads as infrastructure density
                    let boost = 0;
                    for (const hb of HUBS) {
                        const d = Math.hypot((lon - hb.lon) * COS, lat - hb.lat);
                        if (d < 2.6) boost = Math.max(boost, 1 - d / 2.6);
                    }
                    dots.push({ x: ox + gx * scale, y: oy + gy * scale, boost });
                }
            }

            arcs = ARCS.map((a) => {
                const hb = hubs.find((x) => x.name === a.from);
                return { p0: hb.pos, p1: [a.bend[0] * w, a.bend[1] * h], p2: [a.to[0] * w, a.to[1] * h] };
            });

            layer = document.createElement('canvas');
            layer.width = w * dpr;
            layer.height = h * dpr;
            const l = layer.getContext('2d');
            l.scale(dpr, dpr);
            const r = Math.max(1, scale * 0.095);
            dots.forEach((d) => {
                l.fillStyle = d.boost > 0.05 ? AMBER : STONE;
                l.globalAlpha = 0.28 + d.boost * 0.6;
                l.beginPath();
                l.arc(d.x, d.y, r * (1 + d.boost * 0.5), 0, Math.PI * 2);
                l.fill();
            });
        };

        const draw = (time) => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(layer, 0, 0, w, h);

            // digital arcs
            ctx.lineWidth = 1;
            ctx.strokeStyle = COPPER;
            ctx.setLineDash([3, 5]);
            arcs.forEach((a) => {
                ctx.globalAlpha = 0.85;
                ctx.lineDashOffset = -time * 14;
                ctx.beginPath();
                ctx.moveTo(a.p0[0], a.p0[1]);
                ctx.quadraticCurveTo(a.p1[0], a.p1[1], a.p2[0], a.p2[1]);
                ctx.stroke();
            });
            ctx.setLineDash([]);
            arcs.forEach((a) => {
                ctx.globalAlpha = 1;
                ctx.strokeStyle = COPPER;
                ctx.strokeRect(a.p2[0] - 4, a.p2[1] - 4, 8, 8);
                ctx.fillStyle = AMBER;
                ctx.fillRect(a.p2[0] - 1.5, a.p2[1] - 1.5, 3, 3);
            });

            // hubs
            const small = w < 520;
            ctx.font = `500 ${small ? 8.5 : 10}px "JetBrains Mono", monospace`;
            if ('letterSpacing' in ctx) ctx.letterSpacing = '1.2px';
            ctx.textBaseline = 'middle';
            hubs.forEach((hb, i) => {
                const p = (time * 0.4 + i * 0.13) % 1;
                ctx.strokeStyle = AMBER;
                ctx.globalAlpha = (1 - p) * 0.5;
                ctx.beginPath();
                ctx.arc(hb.pos[0], hb.pos[1], 4 + p * 13, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;
                ctx.fillStyle = AMBER;
                ctx.beginPath();
                ctx.arc(hb.pos[0], hb.pos[1], hb.label ? 3.2 : 2.2, 0, Math.PI * 2);
                ctx.fill();
                if (hb.label && !small) {
                    ctx.fillStyle = BONE;
                    ctx.globalAlpha = 0.85;
                    const left = hb.side ? hb.side === 'l' : hb.lon < 76;
                    ctx.textAlign = left ? 'right' : 'left';
                    ctx.fillText(hb.name.toUpperCase(), hb.pos[0] + (left ? -10 : 10), hb.pos[1]);
                    ctx.globalAlpha = 1;
                }
            });
            ctx.textAlign = 'left';
            ctx.globalAlpha = 1;
        };

        const frame = (now) => {
            raf = requestAnimationFrame(frame);
            if (!visible || document.hidden) { last = now; return; }
            clock += Math.min(0.05, (now - last) / 1000 || 0);
            last = now;
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
            draw(0.4);
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
                aria-label="Dot-matrix map of India with physical distribution hubs in major metros and dashed lines showing global digital distribution."
                className="absolute inset-0 h-full w-full"
            />
        </div>
    );
};

export default CoverageMap;
