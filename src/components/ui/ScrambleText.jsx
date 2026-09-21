import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

// Mono "decode" effect used on spec labels when a scene step changes (Quantara does the same).
const ScrambleText = ({ text, duration = 520, className = '' }) => {
    const [out, setOut] = useState(text);
    const raf = useRef(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOut(text); return; }
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, Math.max(0, (now - start) / duration));
            const fixed = Math.floor(p * text.length);
            setOut(text.split('').map((c, i) => (i < fixed || c === ' ' ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''));
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [text, duration]);

    return <span className={className}>{out}</span>;
};

export default ScrambleText;
