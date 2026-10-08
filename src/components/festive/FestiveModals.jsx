import React, { useState, useEffect } from 'react';
import { sendContactMessage } from '../../services/api';
import { IconArrow, IconCheck, IconClose } from '../ui/icons';
import { objectiveOptions } from '../../content/festiveReachContent';
import '../../styles/festive.css';

const fieldCls = 'h-12 w-full rounded-lg border border-bone/12 bg-bone/[0.03] px-4 text-[14px] text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-amber';
const labelCls = 'label mb-2 block text-[10px] text-bone/45';

const Shell = ({ open, onClose, children }) => {
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true">
            <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
            <div className="festive-modal-in relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-t-[24px] border border-bone/10 bg-ink-2 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:rounded-[24px] sm:p-9">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-bone/12 text-bone/60 transition-colors hover:border-amber hover:text-amber"
                >
                    <IconClose size={15} />
                </button>
                {children}
            </div>
        </div>
    );
};

const Field = ({ label, ...props }) => (
    <label className="block">
        <span className={labelCls}>{label}</span>
        <input {...props} className={fieldCls} />
    </label>
);

const SuccessPanel = ({ title, body }) => (
    <div className="pt-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-ink"><IconCheck size={20} /></span>
        <h3 className="display display-md mt-6 text-bone">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-bone/60">{body}</p>
    </div>
);

const SubmitBtn = ({ submitting, label }) => (
    <button
        type="submit"
        disabled={submitting}
        className="group mt-8 inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-amber px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone disabled:opacity-60 sm:w-auto"
    >
        {submitting ? 'Sending…' : label}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/15 transition-transform duration-300 group-hover:translate-x-0.5"><IconArrow size={14} /></span>
    </button>
);

// Inline hero form — sits directly in the hero instead of behind a button, so booking
// takes zero extra clicks. The modal below still exists for the fuller campaign-detail
// capture triggered from deeper in the page.
export const HeroBookForm = () => {
    const [data, setData] = useState({ name: '', brandName: '', emailId: '', phoneNumber: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            const res = await sendContactMessage({
                name: data.name,
                brandName: data.brandName,
                emailId: data.emailId,
                phoneNumber: data.phoneNumber,
                serviceRequired: 'Festive Reach booking — hero form',
                source: 'festive_reach_hero_form',
            });
            if (res.success) {
                if (window.fbq) window.fbq('track', 'Lead', { content_name: 'Festive Reach — Hero form' });
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

    return (
        <div className="rounded-[20px] border border-amber/25 bg-ink-2/90 p-6 shadow-[0_30px_80px_-30px_rgba(216,138,67,0.35)] backdrop-blur-sm sm:p-7">
            {status === 'success' ? (
                <SuccessPanel title="Booked. We’ll be in touch." body="Someone from our team will reach out with a distribution approach for your campaign within 24 hours." />
            ) : (
                <form onSubmit={submit}>
                    <span className="label text-amber">Book your campaign</span>
                    <p className="mt-2 text-[13px] text-bone/50">Tell us the brief. We'll call you back today.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <input required placeholder="Your name" value={data.name} onChange={set('name')} className={fieldCls} />
                        <input required placeholder="Company" value={data.brandName} onChange={set('brandName')} className={fieldCls} />
                        <input required type="email" placeholder="Work email" value={data.emailId} onChange={set('emailId')} className={fieldCls} />
                        <input required type="tel" placeholder="Phone" value={data.phoneNumber} onChange={set('phoneNumber')} className={fieldCls} />
                    </div>
                    {status === 'error' && <p role="alert" className="mt-3 text-[13px] text-red-300">{error}</p>}
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group mt-5 inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-amber px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone disabled:opacity-60"
                    >
                        {status === 'submitting' ? 'Sending…' : 'Book now'}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/15 transition-transform duration-300 group-hover:translate-x-0.5"><IconArrow size={14} /></span>
                    </button>
                </form>
            )}
        </div>
    );
};

// Primary conversion form — fields per the campaign brief, folded into `serviceRequired`
// since the lead backend only persists name/brandName/phoneNumber/serviceRequired/emailId.
export const BookNowModal = ({ open, onClose }) => {
    const [data, setData] = useState({ name: '', brandName: '', emailId: '', phoneNumber: '', objective: '', audience: '', budget: '', timeline: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            const res = await sendContactMessage({
                name: data.name,
                brandName: data.brandName,
                emailId: data.emailId,
                phoneNumber: data.phoneNumber,
                serviceRequired: `Festive Reach booking — Objective: ${data.objective || 'n/a'}; Audience: ${data.audience || 'n/a'}; Budget: ${data.budget || 'n/a'}; Timeline: ${data.timeline || 'n/a'}`,
                source: 'festive_reach_book_now',
            });
            if (res.success) {
                if (window.fbq) window.fbq('track', 'Lead', { content_name: 'Festive Reach — Book Now' });
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

    return (
        <Shell open={open} onClose={onClose}>
            {status === 'success' ? (
                <SuccessPanel title="Booked. We’ll be in touch." body="Someone from our team will reach out with a distribution approach for your campaign within 24 hours." />
            ) : (
                <form onSubmit={submit}>
                    <span className="label text-amber">Book your campaign</span>
                    <p className="mt-3 max-w-[42ch] text-[14.5px] leading-relaxed text-bone/55">Tell us what you're looking to achieve and our team will get in touch with the right campaign approach.</p>
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" required placeholder="Your name" value={data.name} onChange={set('name')} />
                        <Field label="Company name" required placeholder="Company" value={data.brandName} onChange={set('brandName')} />
                        <Field label="Work email" required type="email" placeholder="you@company.com" value={data.emailId} onChange={set('emailId')} />
                        <Field label="Phone number" required type="tel" placeholder="+91 00000 00000" value={data.phoneNumber} onChange={set('phoneNumber')} />
                        <label className="block">
                            <span className={labelCls}>Campaign objective</span>
                            <select value={data.objective} onChange={set('objective')} className={`${fieldCls} appearance-none`}>
                                <option value="" className="bg-ink-2">Select objective</option>
                                {objectiveOptions.map((o) => <option key={o} value={o} className="bg-ink-2">{o}</option>)}
                            </select>
                        </label>
                        <Field label="Target audience" placeholder="e.g. Tier-1 college students" value={data.audience} onChange={set('audience')} />
                        <Field label="Estimated budget" placeholder="e.g. ₹10L" value={data.budget} onChange={set('budget')} />
                        <Field label="Campaign timeline" placeholder="e.g. Diwali week" value={data.timeline} onChange={set('timeline')} />
                    </div>
                    {status === 'error' && <p role="alert" className="mt-5 text-[13px] text-red-300">{error}</p>}
                    <SubmitBtn submitting={status === 'submitting'} label="Book now" />
                </form>
            )}
        </Shell>
    );
};

export const ContactModal = ({ open, onClose }) => {
    const [data, setData] = useState({ name: '', brandName: '', emailId: '', phoneNumber: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            const res = await sendContactMessage({
                name: data.name,
                brandName: data.brandName || data.name,
                emailId: data.emailId,
                phoneNumber: data.phoneNumber,
                serviceRequired: `Festive Reach contact — ${data.message || 'No message provided.'}`,
                source: 'festive_reach_contact',
            });
            if (res.success) {
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

    return (
        <Shell open={open} onClose={onClose}>
            {status === 'success' ? (
                <SuccessPanel title="Message sent." body="Thanks for reaching out — we’ll get back to you shortly." />
            ) : (
                <form onSubmit={submit}>
                    <span className="label text-amber">Contact us</span>
                    <p className="mt-3 max-w-[42ch] text-[14.5px] leading-relaxed text-bone/55">Have a question before booking? Send us a note.</p>
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <Field label="Name" required placeholder="Your name" value={data.name} onChange={set('name')} />
                        <Field label="Company" placeholder="Company" value={data.brandName} onChange={set('brandName')} />
                        <Field label="Email" required type="email" placeholder="you@company.com" value={data.emailId} onChange={set('emailId')} />
                        <Field label="Phone" required type="tel" placeholder="+91 00000 00000" value={data.phoneNumber} onChange={set('phoneNumber')} />
                    </div>
                    <label className="mt-4 block">
                        <span className={labelCls}>Message</span>
                        <textarea required rows={4} placeholder="What are you looking to do?" value={data.message} onChange={set('message')} className={`${fieldCls} h-auto resize-none py-3`} />
                    </label>
                    {status === 'error' && <p role="alert" className="mt-5 text-[13px] text-red-300">{error}</p>}
                    <SubmitBtn submitting={status === 'submitting'} label="Contact us" />
                </form>
            )}
        </Shell>
    );
};
