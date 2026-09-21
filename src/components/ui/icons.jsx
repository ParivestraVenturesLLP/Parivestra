import React from 'react';

// Restrained monochrome touchpoint icon set. 24px grid, 1.5 stroke, no fills.
const Svg = ({ children, size = 24, className = '', ...rest }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...rest}
    >
        {children}
    </svg>
);

// Raw glyph paths (24px grid) — reused by the isometric scenes as well as the icon components.
export const glyphs = {
    acquire: <><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c.6-3.6 3.2-5.5 6.5-5.5 1.1 0 2.1.2 3 .6" /><path d="M18 14v6M15 17h6" /></>,
    transact: <><circle cx="12" cy="12" r="9" /><path d="M8 12h8M13 8l4 4-4 4" /></>,
    launch: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4" /></>,
    engage: <><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9.5h8M8 12.5h5" /></>,
    scale: <><rect x="3" y="11" width="10" height="10" rx="1.5" /><rect x="11" y="3" width="10" height="10" rx="1.5" /></>,
    digital: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    communities: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5M16 14.5c2.7 0 5 1.6 5 4.5" /></>,
    creators: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></>,
    offline: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
    retail: <><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0A2.7 2.7 0 0020 9" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></>,
    data: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
    ai: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
    consumer: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" /></>,
    intent: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
    distribution: <><circle cx="5" cy="12" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 12h5c3 0 3-7 5-7M12 12h5M12 12c3 0 3 7 5 7" /></>,
    engagement: <><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9.5h8M8 12.5h5" /></>,
    transaction: <><path d="M4 7h16v11H4z" /><path d="M4 11h16M8 15h3" /></>,
};

const make = (key) => (p) => <Svg {...p}>{glyphs[key]}</Svg>;

export const IconAcquire = make('acquire');
export const IconTransact = make('transact');
export const IconLaunch = make('launch');
export const IconEngage = make('engage');
export const IconScale = make('scale');
export const IconDigital = make('digital');
export const IconCommunities = make('communities');
export const IconCreators = make('creators');
export const IconOffline = make('offline');
export const IconRetail = make('retail');
export const IconData = make('data');
export const IconAI = make('ai');

export const IconArrow = ({ size = 16, ...p }) => (
    <Svg size={size} strokeWidth="1.75" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const IconArrowUpRight = ({ size = 16, ...p }) => (
    <Svg size={size} strokeWidth="1.75" {...p}><path d="M7 17L17 7M8 7h9v9" /></Svg>
);
export const IconCheck = ({ size = 16, ...p }) => (
    <Svg size={size} strokeWidth="2" {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>
);
export const IconMenu = (p) => <Svg {...p}><path d="M4 8h16M4 16h16" /></Svg>;
export const IconClose = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;

// Quantara-style geometric markers (circle / square / triangle) used on the proof strip.
export const ShapeMark = ({ shape, size = 44 }) => (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="43" height="43" rx="10" stroke="rgba(239,231,219,0.18)" />
        {shape === 'circle' && <circle cx="22" cy="22" r="9" stroke="#D88A43" strokeWidth="1.5" />}
        {shape === 'square' && <rect x="13.5" y="13.5" width="17" height="17" rx="2" stroke="#D88A43" strokeWidth="1.5" />}
        {shape === 'triangle' && <path d="M22 12.5L31.5 30h-19L22 12.5z" stroke="#D88A43" strokeWidth="1.5" strokeLinejoin="round" />}
    </svg>
);

export const outcomeIcons = {
    acquire: IconAcquire,
    transact: IconTransact,
    launch: IconLaunch,
    engage: IconEngage,
    scale: IconScale,
};

export const infraIcons = {
    digital: IconDigital,
    communities: IconCommunities,
    creators: IconCreators,
    offline: IconOffline,
    retail: IconRetail,
    data: IconData,
    ai: IconAI,
};
