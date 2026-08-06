import React from 'react';
import toolImages from '../config/toolImages';

const bannerCSS = `
  @keyframes tbScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .tb-scroll { display:flex; width:max-content; animation:tbScroll 35s linear infinite; }
  .tb-marquee:hover .tb-scroll { animation-play-state:paused; }
`;

const ToolBannerSlider = ({ tools, onSelect }) => {
    const banners = tools.filter((t) => toolImages[t.name]);

    if (banners.length === 0) return null;

    return (
        <section className="py-24 bg-(--pari-bg-secondary) dark:bg-[#080F18] border-t border-(--pari-border) transition-colors overflow-hidden">
            <style>{bannerCSS}</style>
            <div className="max-w-300 mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30 text-[#FF4500] text-[12px] font-bold uppercase tracking-widest mb-6">Product Previews</span>
                    <h2 className="text-[36px] md:text-[46px] font-bold tracking-tight text-(--pari-text-primary) transition-colors">
                        See the tools in action
                    </h2>
                </div>
            </div>

            <div className="relative tb-marquee flex overflow-hidden w-full">
                <div className="tb-scroll">
                    {[...banners, ...banners].map((tool, i) => (
                        <button
                            key={`${tool.id}-${i}`}
                            type="button"
                            onClick={() => onSelect(tool)}
                            className="shrink-0 mx-4 w-100 rounded-2xl overflow-hidden border border-(--pari-border) shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <img src={toolImages[tool.name]} alt={tool.name} className="w-full h-auto block" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolBannerSlider;
