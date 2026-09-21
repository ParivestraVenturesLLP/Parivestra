import { useEffect } from 'react';

const SITE = 'https://parivestra.com';

const setMeta = (attr, key, content) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

// Per-page title, description, canonical, Open Graph and optional JSON-LD (plan §14).
export const usePageMeta = ({ title, description, path = '/', jsonLd }) => {
    useEffect(() => {
        document.title = title;
        setMeta('name', 'description', description);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', `${SITE}${path}`);
        setMeta('property', 'og:image', `${SITE}/og-image.jpg`);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', `${SITE}/og-image.jpg`);

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = `${SITE}${path}`;

        let script;
        if (jsonLd) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.pageMeta = '1';
            script.text = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }
        return () => { script?.remove(); };
    }, [title, description, path, jsonLd]);
};
