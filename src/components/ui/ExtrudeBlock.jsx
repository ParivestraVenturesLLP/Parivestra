import React from 'react';

// Isometric extruded block with a dashed front-face outline — the Parivestra take on
// Quantara's "extrude" blocks, in charcoal with copper edge work. Children (an icon)
// sit on the top face.
const ExtrudeBlock = ({ children, className = '', active = false, tone = 'dark' }) => {
    const top = tone === 'dark' ? '#2a251f' : '#f6efe3';
    const left = tone === 'dark' ? '#1b1814' : '#d9cfbf';
    const right = tone === 'dark' ? '#14120f' : '#c9bda9';
    const edge = tone === 'dark' ? 'rgba(239,231,219,0.16)' : 'rgba(17,16,14,0.18)';

    return (
        <div className={`relative aspect-[10/9] ${className}`}>
            <svg viewBox="0 0 200 180" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <g strokeLinejoin="round" strokeWidth="1.2" stroke={edge}>
                    <path d="M20 64 L100 108 L100 168 L20 124 Z" fill={left} />
                    <path d="M100 108 L180 64 L180 124 L100 168 Z" fill={right} />
                    <path d="M100 20 L180 64 L100 108 L20 64 Z" fill={top} />
                </g>
                {/* dashed outline on the front-left face */}
                <path
                    d="M30 74 L90 107 L90 153 L30 120 Z"
                    fill="none"
                    stroke="#D88A43"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeOpacity={active ? 0.95 : 0.5}
                    className={active ? 'dash-flow' : ''}
                    style={{ transition: 'stroke-opacity .4s ease' }}
                />
                {/* highlight edge */}
                <path d="M20 64 L100 20 L180 64" fill="none" stroke="#D88A43" strokeOpacity={active ? 0.7 : 0.25} strokeWidth="1" style={{ transition: 'stroke-opacity .4s ease' }} />
            </svg>
            <div
                className="absolute left-1/2 top-[34%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ color: active ? '#D88A43' : tone === 'dark' ? '#EFE7DB' : '#11100E', transition: 'color .4s ease' }}
            >
                {children}
            </div>
        </div>
    );
};

export default ExtrudeBlock;
