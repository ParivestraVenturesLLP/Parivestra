import React from 'react';

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];

const statusColors = {
    new: 'bg-[#FF4500]/15 text-[#FF4500] border-[#FF4500]/30',
    contacted: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    qualified: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    closed: 'bg-green-500/15 text-green-500 border-green-500/30',
};

const LeadDetailModal = ({ lead, onClose, onStatusChange }) => {
    if (!lead) return null;

    const digitsOnly = (lead.phone || '').replace(/\D/g, '');

    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-130 bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl shadow-2xl p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-(--pari-text-secondary) hover:bg-(--pari-bg-primary) transition-colors"
                >
                    <i className="fa-solid fa-xmark text-[16px]"></i>
                </button>

                <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FF4500] to-[#FF6B35] flex items-center justify-center text-white text-[20px] font-bold mb-5">
                    {(lead.name || '?').charAt(0).toUpperCase()}
                </div>

                <div className="flex items-start justify-between gap-4 mb-1">
                    <h2 className="text-[22px] font-bold text-(--pari-text-primary)">{lead.name}</h2>
                    <select
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead.id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg border text-[12px] font-semibold focus:outline-none shrink-0 ${statusColors[lead.status] || ''}`}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <p className="text-[14px] text-(--pari-text-secondary) mb-6">{lead.brand_name || '—'}</p>

                <div className="space-y-3 mb-6 text-[14px]">
                    <div className="flex justify-between border-b border-(--pari-border) pb-2">
                        <span className="text-(--pari-text-secondary)">Phone</span>
                        <span className="font-medium text-(--pari-text-primary)">{lead.phone || '—'}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--pari-border) pb-2">
                        <span className="text-(--pari-text-secondary)">Email</span>
                        <span className="font-medium text-(--pari-text-primary)">{lead.email || '—'}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--pari-border) pb-2">
                        <span className="text-(--pari-text-secondary)">Interested In</span>
                        <span className="font-medium text-(--pari-text-primary)">{lead.service_required || '—'}</span>
                    </div>
                    <div className="flex justify-between border-b border-(--pari-border) pb-2">
                        <span className="text-(--pari-text-secondary)">Source</span>
                        <span className="font-medium text-(--pari-text-primary)">{lead.source}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-(--pari-text-secondary)">Received</span>
                        <span className="font-medium text-(--pari-text-primary)">{new Date(lead.created_at).toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <a
                        href={`tel:${digitsOnly}`}
                        className="flex-1 py-3 bg-(--pari-bg-primary) border border-(--pari-border) rounded-xl text-center text-[13px] font-semibold text-(--pari-text-primary) hover:border-[#FF4500]/40 transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-phone"></i> Call
                    </a>
                    <a
                        href={`mailto:${lead.email}`}
                        className="flex-1 py-3 bg-(--pari-bg-primary) border border-(--pari-border) rounded-xl text-center text-[13px] font-semibold text-(--pari-text-primary) hover:border-[#FF4500]/40 transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-envelope"></i> Email
                    </a>
                    <a
                        href={`https://wa.me/${digitsOnly}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-[#25D366] text-white rounded-xl text-center text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <i className="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LeadDetailModal;
