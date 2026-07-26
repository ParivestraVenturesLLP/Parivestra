import React, { useState, useRef, useEffect } from 'react';
import { getAssistantReply } from '../utils/assistantReplies';

const suggestions = ['Our Services', 'Contact Info', 'Partnerships', 'AI Agents'];

const WHATSAPP_LINK = "https://wa.me/917970476060?text=Hello!%20I%20came%20across%20your%20services%20and%20I%27m%20interested.%20I%27d%20love%20to%20learn%20more%20about%20what%20you%20offer.%20Please%20share%20the%20details.%20Thank%20you!";

const AIAssistant = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm the Parivestra Assistant. Ask me anything about our services, clientele, or how to get in touch." },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, typing, open]);

    const sendMessage = (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
        setInput('');
        setTyping(true);

        const reply = getAssistantReply(trimmed);
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
            setTyping(false);
        }, 500 + Math.random() * 400);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="fixed bottom-8 right-8 z-100 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
            >
                <i className="fa-brands fa-whatsapp text-[30px]"></i>
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-[12px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                    Chat on WhatsApp
                </span>
            </a>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Open Assistant"
                className="fixed bottom-24 right-9 z-100 w-11 h-11 bg-linear-to-br from-[#FF4500] to-[#FF6B35] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
            >
                <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-robot'} text-[18px]`}></i>
                {!open && (
                    <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-[12px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                        Chat with Assistant
                    </span>
                )}
            </button>

            {open && (
                <div className="fixed bottom-42 right-8 z-100 w-85 max-w-[calc(100vw-4rem)] h-110 max-h-[calc(100vh-232px)] bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors">
                    <div className="px-5 py-4 bg-linear-to-r from-[#FF4500] to-[#FF6B35] flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-robot text-white text-[18px]"></i>
                        </div>
                        <div>
                            <p className="text-white font-bold text-[14px] leading-tight">Parivestra Assistant</p>
                            <p className="text-white/80 text-[11px]">Usually replies instantly</p>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2.5 rounded-2xl transition-colors ${m.role === 'user'
                                    ? 'self-end bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white rounded-br-sm'
                                    : 'self-start bg-(--pari-bg-primary) text-(--pari-text-primary) border border-(--pari-border) rounded-bl-sm'
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}
                        {typing && (
                            <div className="self-start bg-(--pari-bg-primary) border border-(--pari-border) rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-(--pari-text-secondary) animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-(--pari-text-secondary) animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-(--pari-text-secondary) animate-bounce" />
                            </div>
                        )}
                    </div>

                    {messages.length < 3 && (
                        <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => sendMessage(s)}
                                    className="px-3 py-1.5 text-[11px] font-medium rounded-full border border-(--pari-border) text-(--pari-text-secondary) hover:border-[#FF4500]/50 hover:text-(--pari-text-primary) transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-3 border-t border-(--pari-border) flex items-center gap-2 shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-1 bg-(--pari-bg-primary) border border-(--pari-border) rounded-lg px-3.5 py-2.5 text-[13px] text-(--pari-text-primary) placeholder:text-(--pari-text-secondary)/60 focus:outline-none focus:border-[#FF4500]/50 transition-colors"
                        />
                        <button
                            type="submit"
                            aria-label="Send message"
                            className="w-10 h-10 shrink-0 bg-linear-to-br from-[#FF4500] to-[#FF6B35] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <i className="fa-solid fa-paper-plane text-[14px]"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
