import crypto from 'crypto';

export const timingSafeEqual = (a, b) => {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
};

export const adminAuth = (req, res, next) => {
    const expected = process.env.ADMIN_DASHBOARD_PASSWORD;

    if (!expected) {
        return res.status(500).json({ success: false, message: 'Admin dashboard is not configured.' });
    }

    const authHeader = req.headers.authorization || '';
    const provided = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!provided || !timingSafeEqual(provided, expected)) {
        return res.status(401).json({ success: false, message: 'Invalid admin password.' });
    }

    next();
};
