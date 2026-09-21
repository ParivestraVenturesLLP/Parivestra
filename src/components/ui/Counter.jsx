import React, { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts up once, when the number first scrolls into view. Final value is always the
// verified figure, so a skipped animation never shows a wrong number.
const Counter = ({ value, prefix = '', suffix = '', duration = 1600, className = '' }) => {
    const ref = useRef(null);
    const [n, setN] = useState(prefersReduced() ? value : 0);

    useEffect(() => {
        if (prefersReduced()) return;
        const el = ref.current;
        if (!el) return;
        let raf;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const tick = (now) => {
                // rAF timestamps can predate performance.now() taken in the observer callback
                const p = Math.min(1, Math.max(0, (now - start) / duration));
                setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, { threshold: 0.4 });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, [value, duration]);

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            {prefix}{n}{suffix}
        </span>
    );
};

export default Counter;
