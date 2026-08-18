import { useState, useCallback, useEffect } from 'react';

/**
 * Manages dark-mode state. Persists preference in localStorage
 * and toggles the `dark` class on <body>.
 */
export default function useDarkMode() {
    const [dark, setDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        const stored = localStorage.getItem('applyai-theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('applyai-theme', dark ? 'dark' : 'light');
    }, [dark]);

    const toggle = useCallback(() => setDark((d) => !d), []);

    return [dark, toggle];
}
