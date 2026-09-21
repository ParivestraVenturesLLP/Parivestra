import { useEffect, useState } from 'react';

// 0 → 1 as a tall section scrolls through the viewport (its sticky child stays pinned).
// Drives the Quantara-style scroll-scrubbed scenes.
export const useScrollProgress = (ref) => {
    const [p, setP] = useState(0);

    useEffect(() => {
        let raf = 0;
        const calc = () => {
            raf = 0;
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const total = r.height - window.innerHeight;
            const v = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
            setP((prev) => (Math.abs(prev - v) < 0.0015 ? prev : v));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        calc();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [ref]);

    return p;
};

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const seg = (p, a, b) => clamp01((p - a) / (b - a));
export const ease = (t) => 1 - Math.pow(1 - t, 3);
