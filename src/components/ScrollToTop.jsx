import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top on route changes, or to the #anchor when the URL has one
// (the nav links to sections such as /#outcomes from every page).
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        const id = decodeURIComponent(hash.slice(1));
        let tries = 0;
        const seek = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (tries++ < 20) {
                requestAnimationFrame(seek);
            }
        };
        seek();
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
