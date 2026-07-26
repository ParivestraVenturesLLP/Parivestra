import React from 'react';
import { Link } from 'react-router-dom';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';

const agentTags = ['Automation', 'Customer Support', 'AI SEO & ORM', 'Attribution', 'Influencer Scouting', 'Workflow Agents'];

const PariAIApps = () => {
    return (
        <div className="bg-[var(--pari-bg-primary)] min-h-screen text-[var(--pari-text-primary)] font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-[780px] mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8">AI & Apps</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-[1.0] text-[var(--pari-text-primary)] mb-6 transition-colors">
                        Intelligence,{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>built in.</em>
                    </h1>
                    <p className="text-[19px] text-[var(--pari-text-secondary)] leading-relaxed max-w-[580px] mx-auto transition-colors">
                        Custom AI agents for your brand, and AI-first applications landing on the Play Store soon.
                    </p>
                </div>
            </section>

            {/* ── CUSTOM AI AGENTS ───────────────────────────── */}
            <section className="py-20 px-6 bg-[var(--pari-bg-secondary)] dark:bg-[#080F18] transition-colors">
                <div className="max-w-[1100px] mx-auto">
                    <div className="bg-gradient-to-br from-[#FF4500]/10 to-[#FFB347]/5 border border-[var(--pari-border)] rounded-3xl p-10 md:p-16 mb-16 shadow-sm dark:shadow-none">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Custom Build</span>
                        <h2 className="text-[34px] md:text-[46px] font-bold tracking-tight leading-[1.1] text-[var(--pari-text-primary)] mb-5 max-w-[600px] transition-colors">
                            Get your own customized AI agents
                        </h2>
                        <p className="text-[17px] text-[var(--pari-text-secondary)] leading-relaxed max-w-[600px] mb-8 transition-colors">
                            We design and deploy AI agents built around your brand's data, tone, and goals — from support and reputation monitoring to campaign attribution and creator scouting. Tell us what you need automated, and we'll build the agent for it.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                        >
                            Request a Custom Agent
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {agentTags.map((tag) => (
                            <span key={tag} className="px-5 py-2.5 bg-[var(--pari-bg-secondary)] dark:bg-white/3 border border-[var(--pari-border)] rounded-full text-[14px] font-medium text-[var(--pari-text-primary)] transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── APP COMING SOON ───────────────────────────── */}
            <section className="py-24 px-6 bg-[var(--pari-bg-primary)] transition-colors">
                <div className="max-w-[900px] mx-auto text-center bg-[var(--pari-bg-secondary)] dark:bg-white/4 border border-[var(--pari-border)] rounded-3xl p-12 md:p-20 shadow-sm dark:shadow-none">
                    <div className="w-16 h-16 rounded-2xl bg-[#FF4500]/15 flex items-center justify-center mx-auto mb-6">
                        <i className="fa-brands fa-google-play text-[28px] text-[#FF4500]"></i>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Coming Soon</span>
                    <h2 className="text-[32px] md:text-[44px] font-bold text-[var(--pari-text-primary)] mb-4 transition-colors">
                        AI-first applications, available soon on the Play Store
                    </h2>
                    <p className="text-[16px] text-[var(--pari-text-secondary)] leading-relaxed max-w-[560px] mx-auto mb-8 transition-colors">
                        Track campaigns, chat with our AI assistant, and manage your partnership with Parivestra — right from your phone. We're putting the finishing touches on it.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--pari-border)] text-[var(--pari-text-secondary)] text-[14px] font-medium">
                        <i className="fa-brands fa-google-play text-[16px]"></i>
                        Available soon on Google Play
                    </div>
                </div>
            </section>

            <PariFooter />
        </div>
    );
};

export default PariAIApps;
