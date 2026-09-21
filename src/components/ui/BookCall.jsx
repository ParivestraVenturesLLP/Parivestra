import React from 'react';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { IconArrow } from './icons';
import { CTA_LABEL } from '../../content/homeContent';

// The single primary conversion action for the whole site. One label, one destination.
// `section` feeds "CTA conversion by section" from the measurement plan.
const BookCall = ({ section = 'unknown', objective, variant = 'copper', size = 'md', className = '' }) => {
    const to = objective ? `/book-a-call?objective=${encodeURIComponent(objective)}` : '/book-a-call';

    const onClick = () => {
        try { track('book_a_call_click', { section }); } catch { /* analytics must never block navigation */ }
        if (window.fbq) window.fbq('track', 'Contact');
    };

    const variants = {
        copper: 'bg-copper text-bone hover:bg-amber hover:text-ink',
        amber: 'bg-amber text-ink hover:bg-bone',
        ink: 'bg-ink text-bone hover:bg-bone hover:text-ink',
        ghost: 'border border-bone/25 text-bone hover:border-amber hover:text-amber',
        bone: 'bg-bone text-ink hover:bg-amber',
    };
    const sizes = {
        sm: 'h-10 pl-5 pr-2 text-[12px]',
        md: 'h-12 pl-6 pr-2 text-[13px]',
        lg: 'h-16 pl-9 pr-3 text-[15px]',
    };
    const dot = { sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-10 w-10' };

    return (
        <Link
            to={to}
            onClick={onClick}
            data-cta-section={section}
            className={`group inline-flex items-center gap-4 rounded-full font-mono font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {CTA_LABEL}
            <span className={`flex items-center justify-center rounded-full bg-ink/20 transition-transform duration-300 group-hover:translate-x-0.5 ${dot[size]}`}>
                <IconArrow size={size === 'lg' ? 18 : 14} />
            </span>
        </Link>
    );
};

export default BookCall;
