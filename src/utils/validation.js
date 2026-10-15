// Real format checks — the HTML `type="email"`/`type="tel"` attributes only give loose
// browser hints, not something worth relying on for lead-quality data.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmailFormat = (email) => EMAIL_RE.test((email || '').trim());

// Accepts a 10-digit Indian mobile number, optionally prefixed with +91/91/0,
// after stripping spaces, dashes, dots and parentheses.
export const isValidPhone = (phone) => {
    const digits = (phone || '').replace(/[\s\-().]/g, '');
    return /^(\+?91|0)?[6-9]\d{9}$/.test(digits);
};
