import { useState } from 'react';
import { sendContactMessage } from '../services/api';

export const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        brandName: '',
        phoneNumber: '',
        serviceRequired: '',
        emailId: ''
    });

    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors whenever user begins typing again
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await sendContactMessage(formData);
            if (response.success) {
                // Meta Pixel Lead Event
                if (window.fbq) {
                    window.fbq('track', 'Lead', {
                        content_name: 'Parivestra Registration Form',
                        content_category: 'Agency Inquiry',
                        value: 0,
                        currency: 'INR'
                    });
                }

                setStatus('success');
                setFormData({
                    name: '',
                    brandName: '',
                    phoneNumber: '',
                    serviceRequired: '',
                    emailId: ''
                });
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Failed to send message.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return {
        formData,
        status,
        errorMessage,
        handleChange,
        handleSubmit
    };
};
