import React from 'react';
import ScrollReveal from '../ScrollReveal';

export const Container = ({ children, className = '' }) => (
    <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

// Quantara-style section header: mono index + label on the hairline, big statement below.
export const SectionHead = ({ index, label, title, sub, tone = 'dark', align = 'split' }) => {
    const rule = tone === 'dark' ? 'border-bone/12' : 'border-ink/15';
    const idx = tone === 'dark' ? 'text-copper' : 'text-copper';
    const subCls = tone === 'dark' ? 'text-bone/60' : 'text-ink/65';
    return (
        <ScrollReveal>
            <div className={`flex items-center justify-between border-b pb-4 ${rule}`}>
                <span className={`label ${idx}`}>[ {index} ]</span>
                <span className={`label ${tone === 'dark' ? 'text-stone' : 'text-ink/55'}`}>{label}</span>
            </div>
            <div className={`mt-10 grid gap-8 lg:mt-14 ${align === 'split' ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
                <h2 className={`display display-lg text-balance ${align === 'split' ? 'lg:col-span-8' : 'max-w-[18ch]'}`}>{title}</h2>
                {sub && <p className={`text-[17px] leading-relaxed lg:col-span-4 lg:pb-2 ${subCls}`}>{sub}</p>}
            </div>
        </ScrollReveal>
    );
};

// Crosshair-cornered frame used around the big visuals.
export const Frame = ({ children, className = '' }) => (
    <div className={`frame ${className}`}>
        <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
        {children}
    </div>
);
