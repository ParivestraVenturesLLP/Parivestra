import React, { useEffect, useState } from 'react';
import { CALENDAR_URL, buildWhatsappLink } from '../config/contactLinks';

const WHATSAPP_LINK = buildWhatsappLink("Hi! I'd like to book a free demo of your AI agents and tools. Please share the details.");

const SHOWN_KEY = 'pari_demo_popup_shown';

const DemoPopup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem(SHOWN_KEY)) return;

        const timer = setTimeout(() => {
            setVisible(true);
            sessionStorage.setItem(SHOWN_KEY, '1');
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const close = () => setVisible(false);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            onClick={close}
        >
            <div
                className="relative w-full max-w-105 bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl shadow-2xl p-8 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-(--pari-text-secondary) hover:bg-(--pari-bg-primary) transition-colors"
                >
                    <i className="fa-solid fa-xmark text-[16px]"></i>
                </button>

                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-linear-to-br from-[#FF4500] to-[#FF6B35] flex items-center justify-center">
                    <i className="fa-solid fa-microchip text-white text-[24px]"></i>
                </div>

                <h2 className="text-[22px] font-bold text-(--pari-text-primary) mb-3">
                    Explore Our AI Agents &amp; Tools
                </h2>
                <p className="text-[14px] text-(--pari-text-secondary) leading-relaxed mb-7">
                    See how our AI-powered marketing stack can drive real outcomes for your brand. Book a free demo or start a conversation right now.
                </p>

                <div className="flex flex-col gap-3">
                    <a
                        href={CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[15px] font-semibold rounded-xl hover:from-[#E03D00] hover:to-[#FF4500] transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-calendar-check"></i>
                        Book a Free Demo
                    </a>
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-[#25D366] text-white text-[15px] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <i className="fa-brands fa-whatsapp text-[18px]"></i>
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DemoPopup;
