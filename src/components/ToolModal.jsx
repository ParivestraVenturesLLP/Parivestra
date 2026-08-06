import React, { useState } from 'react';
import { CALENDAR_URL } from '../config/contactLinks';
import { sendContactMessage } from '../services/api';
import FormField from './Contact/FormField';

const ToolModal = ({ tool, onClose }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', brandName: '', phoneNumber: '', emailId: '' });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [errorMessage, setErrorMessage] = useState('');

    if (!tool) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await sendContactMessage({
                ...formData,
                serviceRequired: tool.name,
                source: tool.name,
            });

            if (response.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Failed to send enquiry.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-130 max-h-[85vh] overflow-y-auto bg-(--pari-bg-secondary) border border-(--pari-border) rounded-2xl shadow-2xl p-8"
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

                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#FF4500] to-[#FF6B35] flex items-center justify-center mb-5">
                    <i className={`${tool.icon} text-white text-[26px]`}></i>
                </div>

                <h2 className="text-[24px] font-bold text-(--pari-text-primary) mb-3">{tool.name}</h2>
                <p className="text-[15px] text-(--pari-text-secondary) leading-relaxed mb-7">{tool.description}</p>

                {!showForm ? (
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
                        <button
                            type="button"
                            onClick={() => setShowForm(true)}
                            className="w-full py-3.5 bg-(--pari-bg-primary) border border-(--pari-border) text-(--pari-text-primary) text-[15px] font-semibold rounded-xl hover:border-[#FF4500]/40 transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                            Submit Enquiry
                        </button>
                    </div>
                ) : status === 'success' ? (
                    <p className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 font-medium rounded-lg text-center">
                        Enquiry sent! We'll be in touch about {tool.name} shortly.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FormField label="Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                        <FormField label="Brand Name" name="brandName" placeholder="Company Inc." value={formData.brandName} onChange={handleChange} />
                        <FormField type="tel" label="Phone Number" name="phoneNumber" placeholder="+91 00000 00000" value={formData.phoneNumber} onChange={handleChange} />
                        <FormField type="email" label="Email Id" name="emailId" placeholder="john@example.com" value={formData.emailId} onChange={handleChange} />

                        {status === 'error' && (
                            <p className="text-red-500 text-[13px] font-medium">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-3.5 bg-linear-to-r from-[#FF4500] to-[#FF6B35] text-white text-[15px] font-semibold rounded-xl hover:from-[#E03D00] hover:to-[#FF4500] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Sending...' : `Submit Enquiry for ${tool.name}`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ToolModal;
