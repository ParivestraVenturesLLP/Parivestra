import React, { useEffect } from 'react';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';

const PariAbout = () => {
    useEffect(() => {
        if (window.fbq) {
            window.fbq('track', 'ViewContent', { content_name: 'About Page' });
        }
    }, []);

    return (
        <div className="bg-(--pari-bg-primary) min-h-screen text-(--pari-text-primary) font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-200 mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8">About Us</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-none text-(--pari-text-primary) mb-6 transition-colors">
                        What is{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>Parivestra?</em>
                    </h1>
                </div>
            </section>

            {/* ── CORE DESCRIPTION ─────────────────────────── */}
            <section className="py-16 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-225 mx-auto">
                    <div className="bg-(--pari-bg-secondary) dark:bg-white/4 border border-(--pari-border) rounded-3xl p-10 md:p-16 relative overflow-hidden group hover:border-[#FF4500]/30 transition-all shadow-sm dark:shadow-none">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF4500]/5 rounded-full blur-3xl group-hover:bg-[#FF4500]/10 transition-all" />

                        <div className="relative z-10">
                            <p className="text-[22px] md:text-[26px] leading-[1.6] text-(--pari-text-primary) mb-10 font-medium transition-colors">
                                Parivestra is a modern distribution and growth infrastructure company built for brands that want <span className="text-[#FF4500]">outcomes, not impressions</span>.
                            </p>

                            <div className="h-px w-full bg-(--pari-border) mb-10" />

                            <p className="text-[18px] text-(--pari-text-secondary) leading-relaxed mb-8 transition-colors">
                                We bridge the gap between advanced digital marketing, creator networks, performance commerce, and on-ground activations to drive scalable growth across all domains.
                            </p>

                            <p className="text-[18px] text-(--pari-text-secondary) leading-relaxed transition-colors">
                                Our fundamental approach centers on prioritizing audiences, leveraging data, and focusing strictly on results. Every campaign we launch works toward concrete objectives like improved revenue, sustained user adoption, and enduring brand prominence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES / THESIS ───────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-275 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Community-First',
                                desc: 'We execute across high-intent environments where trust is built deep with the community.',
                                icon: 'fa-solid fa-handshake-angle'
                            },
                            {
                                title: 'Data-Led',
                                desc: 'Unified data capture across offline and online consumer journeys for true performance mapping.',
                                icon: 'fa-solid fa-chart-line'
                            },
                            {
                                title: 'Outcome-Driven',
                                desc: 'Models tied directly to sales and revenue, ensuring every rupee spent delivers a measurable result.',
                                icon: 'fa-solid fa-bullseye'
                            }
                        ].map((v) => (
                            <div key={v.title} className="text-center group">
                                <i className={`${v.icon} text-[56px] text-[#FF4500] mb-6 block group-hover:scale-110 transition-transform duration-300`}></i>
                                <h3 className="text-[24px] font-bold text-(--pari-text-primary) mb-4 transition-colors">{v.title}</h3>
                                <p className="text-[16px] text-(--pari-text-secondary) leading-relaxed transition-colors">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SCALE RECAP ───────────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-275 mx-auto bg-linear-to-br from-[#FF4500]/10 to-[#FFB347]/5 border border-(--pari-border) rounded-3xl p-12 md:p-20 flex flex-col items-center text-center shadow-sm dark:shadow-none">
                    <h2 className="text-[32px] md:text-[44px] font-bold text-(--pari-text-primary) mb-12 transition-colors">Our Scale Today</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full">
                        {[
                            { val: '100+', label: 'Brands Enabled' },
                            { val: '300M+', label: 'Device & Community Touchpoints' },
                            { val: '₹120+ Cr', label: 'Aggregated Sales Driven' }
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-[48px] md:text-[56px] font-bold text-[#FF4500] leading-none mb-3">{s.val}</div>
                                <div className="text-[14px] text-(--pari-text-secondary) font-bold uppercase tracking-wider transition-colors">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariAbout;
