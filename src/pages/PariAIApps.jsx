import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PariNavbar from './PariNavbar';
import PariFooter from './PariFooter';
import ScrollReveal from '../components/ScrollReveal';
import ToolModal from '../components/ToolModal';
import ToolBannerSlider from '../components/ToolBannerSlider';
import { getTools } from '../services/toolsApi';

const agentTags = [
    { name: 'Automation', icon: 'fa-solid fa-gears', description: 'Rule-based and AI-driven workflows that handle repetitive marketing tasks automatically, freeing your team to focus on strategy.' },
    { name: 'Customer Support', icon: 'fa-solid fa-headset', description: 'A trained conversational agent that resolves FAQs instantly and routes complex queries straight to your team.' },
    { name: 'AI SEO & ORM', icon: 'fa-solid fa-magnifying-glass-chart', description: 'Continuous search optimization and reputation monitoring, surfacing issues and opportunities before they impact your brand.' },
    { name: 'Attribution', icon: 'fa-solid fa-chart-line', description: 'Maps every campaign touchpoint, online and offline, back to real revenue outcomes.' },
    { name: 'Influencer Scouting', icon: 'fa-solid fa-users-viewfinder', description: 'AI-ranked creator shortlists matched to your audience, budget, and campaign goals.' },
    { name: 'Workflow Agents', icon: 'fa-solid fa-diagram-project', description: 'Custom agents that plug into your existing tools and automate multi-step internal workflows end to end.' },
];

const accentColors = ['#FF4500', '#FFB347', '#9999FE', '#81E4BA', '#FBC768', '#FF885C'];

const howItWorks = [
    { step: '01', title: 'Request', desc: 'Tell us which tool or agent your team needs, and what it should plug into.' },
    { step: '02', title: 'Configure', desc: 'We tune it to your brand data, tone, and workflows before it goes live.' },
    { step: '03', title: 'Deploy', desc: 'It runs inside your stack, with results tracked back to real outcomes.' },
];

const PariAIApps = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTool, setSelectedTool] = useState(null);

    useEffect(() => {
        getTools()
            .then(setTools)
            .catch(() => setTools([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-(--pari-bg-primary) min-h-screen text-(--pari-text-primary) font-sans transition-colors">
            <PariNavbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="pt-32 pb-8 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#FF4500]/8 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-195 mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-8">AI & Apps</span>
                    <h1 className="text-[52px] md:text-[68px] font-bold tracking-[-0.03em] leading-none text-(--pari-text-primary) mb-6 transition-colors">
                        Intelligence,{' '}
                        <em style={{ fontFamily: 'Georgia, serif', color: '#FF4500' }}>built in.</em>
                    </h1>
                    <p className="text-[19px] text-(--pari-text-secondary) leading-relaxed max-w-145 mx-auto transition-colors">
                        Custom AI agents for your brand, and AI-first applications landing on the Play Store soon.
                    </p>
                </div>
            </section>

            {/* ── AI TOOLS ─────────────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-275 mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Our Tools</span>
                        <h2 className="text-[34px] md:text-[46px] font-bold tracking-tight leading-[1.1] text-(--pari-text-primary) mb-4 max-w-150 transition-colors">
                            AI tools powering every engagement
                        </h2>
                        <p className="text-[17px] text-(--pari-text-secondary) max-w-140 leading-relaxed transition-colors">
                            The same infrastructure our agents run on, available as standalone tools for your team.
                        </p>
                    </div>

                    {/* How it works strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {howItWorks.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 100}>
                                <div className="flex items-start gap-4">
                                    <span className="text-[36px] font-bold text-[#FF4500]/25 leading-none shrink-0" style={{ fontFamily: 'Georgia, serif' }}>{s.step}</span>
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-(--pari-text-primary) mb-1">{s.title}</h4>
                                        <p className="text-[14px] text-(--pari-text-secondary) leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {loading ? (
                        <p className="text-center text-[14px] text-(--pari-text-secondary)">Loading tools...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {tools.map((tool, i) => {
                                const color = accentColors[i % accentColors.length];
                                return (
                                    <ScrollReveal key={tool.id} delay={(i % 3) * 100}>
                                        <div
                                            onClick={() => setSelectedTool(tool)}
                                            className="h-full bg-(--pari-bg-secondary)/50 dark:bg-white/3 border border-(--pari-border) rounded-2xl p-6 hover:bg-(--pari-bg-secondary)/80 dark:hover:bg-white/6 hover:-translate-y-1 transition-all group shadow-sm dark:shadow-none relative overflow-hidden cursor-pointer">
                                            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: color }} />
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                                style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                                            >
                                                <i className={`${tool.icon} text-white text-[22px]`}></i>
                                            </div>
                                            <h3 className="text-[17px] font-semibold text-(--pari-text-primary) mb-2 transition-colors relative z-10">{tool.name}</h3>
                                            <p className="text-[14px] text-(--pari-text-secondary) leading-relaxed relative z-10">{tool.description}</p>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <ToolBannerSlider tools={tools} onSelect={setSelectedTool} />

            {/* ── CUSTOM AI AGENTS ───────────────────────────── */}
            <section className="py-20 px-6 bg-(--pari-bg-secondary) dark:bg-[#080F18] transition-colors">
                <div className="max-w-275 mx-auto">
                    <div className="bg-linear-to-br from-[#FF4500]/10 to-[#FFB347]/5 border border-(--pari-border) rounded-3xl p-10 md:p-16 mb-16 shadow-sm dark:shadow-none">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Custom Build</span>
                        <h2 className="text-[34px] md:text-[46px] font-bold tracking-tight leading-[1.1] text-(--pari-text-primary) mb-5 max-w-150 transition-colors">
                            Get your own customized AI agents
                        </h2>
                        <p className="text-[17px] text-(--pari-text-secondary) leading-relaxed max-w-150 mb-8 transition-colors">
                            We design and deploy AI agents built around your brand's data, tone, and goals — from support and reputation monitoring to campaign attribution and creator scouting. Tell us what you need automated, and we'll build the agent for it.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold text-[16px] rounded-[14px] hover:from-[#E03D00] hover:to-[#FF4500] transition-all shadow-xl shadow-orange-500/30"
                        >
                            Request a Custom Agent
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {agentTags.map((agent) => (
                            <button
                                key={agent.name}
                                type="button"
                                onClick={() => setSelectedTool(agent)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-(--pari-bg-secondary) dark:bg-white/3 border border-(--pari-border) rounded-full text-[14px] font-medium text-(--pari-text-primary) hover:border-[#FF4500]/40 hover:text-[#FF4500] transition-colors cursor-pointer"
                            >
                                <i className={`${agent.icon} text-[13px]`}></i>
                                {agent.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── APP COMING SOON ───────────────────────────── */}
            <section className="py-24 px-6 bg-(--pari-bg-primary) transition-colors">
                <div className="max-w-225 mx-auto text-center bg-(--pari-bg-secondary) dark:bg-white/4 border border-(--pari-border) rounded-3xl p-12 md:p-20 shadow-sm dark:shadow-none">
                    <div className="w-16 h-16 rounded-2xl bg-[#FF4500]/15 flex items-center justify-center mx-auto mb-6">
                        <i className="fa-brands fa-google-play text-[28px] text-[#FF4500]"></i>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Coming Soon</span>
                    <h2 className="text-[32px] md:text-[44px] font-bold text-(--pari-text-primary) mb-4 transition-colors">
                        AI-first applications, available soon on the Play Store
                    </h2>
                    <p className="text-[16px] text-(--pari-text-secondary) leading-relaxed max-w-140 mx-auto mb-8 transition-colors">
                        Track campaigns, chat with our AI assistant, and manage your partnership with Parivestra — right from your phone. We're putting the finishing touches on it.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-(--pari-border) text-(--pari-text-secondary) text-[14px] font-medium">
                        <i className="fa-brands fa-google-play text-[16px]"></i>
                        Available soon on Google Play
                    </div>
                </div>
            </section>

            <PariFooter />

            <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        </div>
    );
};

export default PariAIApps;
