// Free/personal email providers — rejected on landing-page forms so every lead comes
// in with a company domain we can actually sell to, instead of a bare Gmail address.
const FREE_EMAIL_DOMAINS = new Set([
    'gmail.com', 'googlemail.com',
    'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk', 'ymail.com', 'rocketmail.com',
    'hotmail.com', 'hotmail.co.in', 'hotmail.co.uk',
    'outlook.com', 'outlook.in', 'live.com', 'msn.com',
    'icloud.com', 'me.com', 'mac.com',
    'aol.com', 'protonmail.com', 'proton.me',
    'rediffmail.com', 'mail.com', 'gmx.com', 'yandex.com', 'inbox.com', 'fastmail.com', 'hey.com',
]);

export const isWorkEmail = (email) => {
    const domain = (email || '').trim().toLowerCase().split('@')[1];
    return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
};

export const WORK_EMAIL_ERROR = 'Please use your work email, not a personal Gmail/Yahoo/Outlook address.';
