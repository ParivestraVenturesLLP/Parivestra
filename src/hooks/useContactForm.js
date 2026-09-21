import { useState } from 'react';
import { sendContactMessage } from '../services/api';

const EMPTY = {
    name: '',
    brandName: '',
    emailId: '',
    phoneNumber: '',
    objective: '',
    targetMarket: '',
    monthlyScale: '',
};

// Book a Call qualification flow (plan §10): company, work email, objective, target market,
// approximate monthly scale. The lead API stores one `serviceRequired` string, so the
// qualification answers are packed into it — no backend change needed.
export const useContactForm = (initial = {}) => {
    const [formData, setFormData] = useState({ ...EMPTY, ...initial });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleChange = (e) => setField(e.target.name, e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.objective) {
            setStatus('error');
            setErrorMessage('Please choose the outcome you are trying to achieve.');
            return;
        }
        setStatus('submitting');
        setErrorMessage('');

        const serviceRequired = [
            `Objective: ${formData.objective}`,
            formData.targetMarket && `Target market: ${formData.targetMarket}`,
            formData.monthlyScale && `Monthly scale: ${formData.monthlyScale}`,
        ].filter(Boolean).join(' | ');

        try {
            const response = await sendContactMessage({
                name: formData.name,
                brandName: formData.brandName,
                emailId: formData.emailId,
                phoneNumber: formData.phoneNumber,
                serviceRequired,
                source: 'book_a_call',
            });

            if (response.success) {
                if (window.fbq) {
                    window.fbq('track', 'Lead', {
                        content_name: 'Parivestra Book a Call',
                        content_category: formData.objective,
                        value: 0,
                        currency: 'INR',
                    });
                }
                setStatus('success');
                setFormData({ ...EMPTY });
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Failed to send. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return { formData, status, errorMessage, handleChange, setField, handleSubmit };
};
