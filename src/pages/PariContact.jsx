import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import { useContactForm } from '../hooks/useContactForm';
import { objectives, CTA_LABEL } from '../content/homeContent';
import { CALENDAR_URL, buildWhatsappLink } from '../config/contactLinks';
import { IconArrow, IconCheck } from '../components/ui/icons';
import { usePageMeta } from '../hooks/usePageMeta';

const fieldCls =
    'w-full border-0 border-b border-bone/25 bg-transparent px-0 py-3 text-[17px] text-bone placeholder:text-bone/30 outline-none transition-colors focus:border-amber';

const Field = ({ label, ...props }) => (
    <label className="block">
        <span className="label text-stone">{label}</span>
        <input {...props} className={fieldCls} />
    </label>
);

// Booking page — plan §10. Headline is the qualifying question; calendar follows submission.
const PariContact = () => {
    usePageMeta({ title: 'Book a Call | Parivestra', description: 'What outcome are you trying to achieve? Tell us the outcome and book a call.', path: '/book-a-call' });
    const [params] = useSearchParams();
    const preset = objectives.find((o) => o.toLowerCase() === (params.get('objective') || '').toLowerCase()) || '';
    const { formData, status, errorMessage, handleChange, setField, handleSubmit } = useContactForm({ objective: preset });
    const submitting = status === 'submitting';

    return (
        <div className="min-h-screen bg-ink font-sans text-bone">
            <PariNavbar />

            <main className="relative overflow-hidden pt-[128px] lg:pt-[160px]">
                <div className="tech-grid pointer-events-none absolute inset-0" />
                <div className="glow-copper pointer-events-none absolute inset-0" />

                <div className="relative mx-auto grid max-w-[1360px] gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-12 lg:px-10">
                    <div className="lg:col-span-6">
                        <span className="label text-amber">Book a call</span>
                        <h1 className="display display-lg mt-6 text-balance">What outcome are you trying to achieve?</h1>
                        <p className="mt-8 max-w-[480px] text-[17px] leading-relaxed text-bone/65">
                            Tell us the outcome. We’ll engineer the distribution. Share a few details and pick a time — someone from our team will reach you within 24 hours.
                        </p>
                        <ul className="mt-10 space-y-4 border-t border-bone/12 pt-8">
                            {['Company and objective', 'Target market and scale', 'A calendar slot that works for you'].map((t, i) => (
                                <li key={t} className="flex items-center gap-4 text-[15px] text-bone/75">
                                    <span className="label text-copper">0{i + 1}</span>{t}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-6">
                        {status === 'success' ? (
                            <div className="rounded-[24px] border border-amber/40 bg-ink-2 p-8 sm:p-10">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-ink"><IconCheck size={20} /></span>
                                <h2 className="display display-md mt-6">Received. Now pick a time.</h2>
                                <p className="mt-3 text-[16px] leading-relaxed text-bone/65">Choose a slot on the calendar and we’ll come prepared for your outcome.</p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex h-12 items-center gap-3 rounded-full bg-copper px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink">
                                        Open calendar <IconArrow size={14} />
                                    </a>
                                    <a href={buildWhatsappLink("Hi! I just requested a call on the Parivestra website.")} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex h-12 items-center rounded-full border border-bone/25 px-6 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:border-amber hover:text-amber">
                                        WhatsApp us
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="rounded-[24px] border border-bone/12 bg-ink-2 p-7 sm:p-10">
                                <fieldset>
                                    <legend className="label text-stone">Objective</legend>
                                    <div className="mt-4 flex flex-wrap gap-2.5">
                                        {objectives.map((o) => {
                                            const on = formData.objective === o;
                                            return (
                                                <button
                                                    key={o}
                                                    type="button"
                                                    aria-pressed={on}
                                                    onClick={() => setField('objective', o)}
                                                    className={`label rounded-full border px-4 py-2.5 transition-colors ${on ? 'border-amber bg-amber text-ink' : 'border-bone/20 text-bone/70 hover:border-amber hover:text-amber'}`}
                                                >
                                                    {o}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                                    <Field label="Name" name="name" required autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
                                    <Field label="Company" name="brandName" required autoComplete="organization" placeholder="Company name" value={formData.brandName} onChange={handleChange} />
                                    <Field label="Work email" name="emailId" type="email" required autoComplete="email" placeholder="you@company.com" value={formData.emailId} onChange={handleChange} />
                                    <Field label="Phone" name="phoneNumber" type="tel" required autoComplete="tel" placeholder="+91 00000 00000" value={formData.phoneNumber} onChange={handleChange} />
                                    <Field label="Target market" name="targetMarket" placeholder="City, region or country" value={formData.targetMarket} onChange={handleChange} />
                                    <Field label="Approximate monthly scale" name="monthlyScale" placeholder="e.g. 10,000 signups" value={formData.monthlyScale} onChange={handleChange} />
                                </div>

                                {status === 'error' && (
                                    <p role="alert" className="mt-7 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[14px] text-red-300">
                                        {errorMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group mt-9 inline-flex h-14 items-center gap-4 rounded-full bg-copper pl-8 pr-2.5 font-mono text-[14px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-60"
                                >
                                    {submitting ? 'Sending…' : CTA_LABEL}
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/20"><IconArrow size={16} /></span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <PariFooter />
        </div>
    );
};

export default PariContact;
