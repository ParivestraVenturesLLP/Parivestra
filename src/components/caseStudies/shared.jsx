import React, { useState } from 'react';
import { IconCheck, IconArrowUpRight, IconDownload } from '../ui/icons';
import { sendContactMessage } from '../../services/api';

import swiggyLogo from '../../assets/swiggy.png';
import uberLogo from '../../assets/Uber.svg';
import meeshoLogo from '../../assets/meesho.jpg';
import flixbusLogo from '../../assets/flixbus.png';
import nestleLogo from '../../assets/nestle.png';
import myntraLogo from '../../assets/myntra.jpg';

// Every brand's own logo, shown in a light chip so it reads correctly regardless of
// the source file's own format/background (JPG, transparent PNG, SVG — all safe here).
export const logoFor = { Swiggy: swiggyLogo, Uber: uberLogo, Meesho: meeshoLogo, FlixBus: flixbusLogo, Nestlé: nestleLogo, Myntra: myntraLogo };

export const DECK = 'https://drive.google.com/file/d/14sm-jmkoAbmcyzgFmxZ0Ryg4Xdeh6Bo3/view?usp=sharing';

const fieldCls = 'h-12 rounded-lg border border-bone/14 bg-transparent px-4 text-[14px] text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-amber';

// Split "50+" into digits + suffix so the "+" can carry the accent colour.
export const Metric = ({ value, className = 'text-[clamp(5rem,10vw,9rem)]' }) => {
    const m = /^(\d[\d,.]*)(.*)$/.exec(value);
    return (
        <span className={`display block font-extralight leading-[0.82] tracking-[-0.06em] ${className}`}>
            {m[1]}<span className="text-amber">{m[2]}</span>
        </span>
    );
};

export const BrandMark = ({ brand, size = 'md' }) => {
    const logo = logoFor[brand];
    const h = size === 'lg' ? 'h-9 sm:h-10' : 'h-6';
    if (!logo) return <span className="display text-[1.5rem]">{brand}</span>;
    return (
        <span className={`inline-flex ${size === 'lg' ? 'h-16 px-6' : 'h-11 px-4'} shrink-0 items-center rounded-lg bg-bone`}>
            <img src={logo} alt={brand} className={`${h} w-auto max-w-[160px] object-contain`} />
        </span>
    );
};

// Gated download: name/company/work email/phone — same lead backend as Book a Call
// (all four fields are required server-side), just without the objective chips.
export const DownloadForm = ({ brand }) => {
    const [data, setData] = useState({ name: '', brandName: '', emailId: '', phoneNumber: '' });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [error, setError] = useState('');

    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            const res = await sendContactMessage({
                ...data,
                serviceRequired: `Download case study: ${brand}`,
                source: 'case_study_download',
            });
            if (res.success) {
                if (window.fbq) window.fbq('track', 'Lead', { content_name: `Case Study Download — ${brand}`, value: 0, currency: 'INR' });
                setStatus('success');
            } else {
                setStatus('error');
                setError(res.message || 'Could not send. Please try again.');
            }
        } catch {
            setStatus('error');
            setError('Network error. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="rounded-xl border border-amber/30 bg-amber/10 p-6">
                <p className="flex items-center gap-2 text-[15px] text-bone/90"><IconCheck size={17} className="shrink-0 text-amber" /> Thanks — here’s the {brand} case study.</p>
                <a href={DECK} target="_blank" rel="noreferrer" className="label mt-4 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-ink transition-colors hover:bg-bone">
                    Open case study <IconArrowUpRight size={13} />
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="grid gap-3.5 rounded-xl border border-bone/14 bg-bone/[0.03] p-6 sm:grid-cols-2">
            <p className="label text-[10px] text-stone sm:col-span-2">Get the full {brand} case study</p>
            <input required placeholder="Your name" value={data.name} onChange={set('name')} className={fieldCls} />
            <input required placeholder="Company" value={data.brandName} onChange={set('brandName')} className={fieldCls} />
            <input required type="email" placeholder="Work email" value={data.emailId} onChange={set('emailId')} className={fieldCls} />
            <input required type="tel" placeholder="Phone" value={data.phoneNumber} onChange={set('phoneNumber')} className={fieldCls} />
            {status === 'error' && <p role="alert" className="text-[13px] text-red-300 sm:col-span-2">{error}</p>}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="label mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-amber text-ink transition-colors hover:bg-bone disabled:opacity-60 sm:col-span-2"
            >
                {status === 'submitting' ? 'Sending…' : <>Download case study <IconDownload size={14} /></>}
            </button>
        </form>
    );
};
