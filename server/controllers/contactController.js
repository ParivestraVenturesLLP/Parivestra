import { sendContactEmail } from '../services/emailService.js';
import { createLead } from '../services/leadsService.js';

export const handleContactForm = async (req, res, next) => {
    try {
        const { name, brandName, phoneNumber, serviceRequired, emailId, source } = req.body;

        // Basic Data Validation
        if (!name || !emailId || !phoneNumber || !serviceRequired || !brandName) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Persist the lead first — this is the source of truth for the admin dashboard.
        await createLead({ name, brandName, phoneNumber, serviceRequired, emailId, source: source || 'contact_form' });

        // Email notification is best-effort: if SMTP hiccups, the lead is still
        // safely captured in Supabase, so we don't fail the request over it.
        try {
            await sendContactEmail({ name, brandName, phoneNumber, serviceRequired, emailId });
        } catch (emailError) {
            console.error('[ContactController] Lead saved but email notification failed:', emailError.message);
        }

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('[ContactController] Error saving lead:', error.message);

        // Pass error down to the global error middleware
        next(error);
    }
};
