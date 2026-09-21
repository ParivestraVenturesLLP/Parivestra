import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// The Parivestra identity is dark-first (charcoal + copper). The theme API is kept
// so existing consumers keep working, but the site no longer offers a light mode.
export function ThemeProvider({ children }) {
    const [theme] = useState('dark');

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {};

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}
