// Google Ads conversion IDs, one per goal set up in the Ads account.
export const GOOGLE_ADS_CONVERSIONS = {
    bookAppointment: 'AW-18512237161/KeuJCIPwn5wdEOmkqftE',
    submitLeadForm: 'AW-18512237161/BE2-CN6_8JwdEOmkqftE',
};

// Fires a Google Ads conversion at the moment it actually happens (a successful form
// submission), not on page load — this is a single-page app, so there's no separate
// "thank you" page for Google's literal page-load snippet to live on. Email/phone are
// passed as enhanced-conversions user_data; Google hashes them client-side before
// sending, we never transmit a raw hash ourselves.
export const fireGoogleAdsConversion = (conversionId, { email, phone } = {}) => {
    if (!window.gtag) return;
    if (email || phone) {
        window.gtag('set', 'user_data', { email, phone_number: phone });
    }
    window.gtag('event', 'conversion', { send_to: conversionId, value: 1.0, currency: 'INR' });
};
