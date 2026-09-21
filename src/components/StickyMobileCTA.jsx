import React from 'react';
import { useLocation } from 'react-router-dom';
import BookCall from './ui/BookCall';

// Persistent Book a Call on mobile (plan §10 / §12). Hidden where it would be redundant.
const HIDDEN_ON = ['/book-a-call', '/contact', '/admin'];

const StickyMobileCTA = () => {
    const { pathname } = useLocation();
    if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 px-5 py-3 backdrop-blur-sm lg:hidden">
            <BookCall section="sticky-mobile" className="w-full justify-between" />
        </div>
    );
};

export default StickyMobileCTA;
