export const CALENDAR_URL = 'https://calendar.app.google/xy8sup774zfrPPrB6';

export const WHATSAPP_NUMBER = '917970476060';

export const buildWhatsappLink = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
