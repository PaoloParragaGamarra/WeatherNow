/**
 * useTheme Hook - Theme management (dark/light mode)
 * Following SRP: Only handles theme state and persistence
 * Following DIP: Theme logic is abstracted from components
 */
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weatherTheme';

/**
 * Get initial theme from localStorage or system preference
 */
const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
        return true; // Default to dark
    }
};

/**
 * Custom hook for managing theme state
 * @returns {Object} Theme state and toggle function
 */
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    // Persist theme to localStorage and update body class
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return {
        isDarkMode,
        setIsDarkMode,
        toggleTheme
    };
}

export default useTheme;
