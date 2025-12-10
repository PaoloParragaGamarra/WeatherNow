/**
 * useTemperatureUnit Hook - Temperature unit management (°C/°F)
 * Following SRP: Only handles temperature unit state and conversion
 * Following DIP: Temperature logic is abstracted from components
 */
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'weatherUnit';

/**
 * Get saved unit preference from localStorage
 */
const getSavedUnit = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved !== 'fahrenheit'; // Default to Celsius
    } catch {
        return true; // Default to Celsius
    }
};

/**
 * Convert Celsius to Fahrenheit
 */
const toFahrenheit = (celsius) => Math.round((celsius * 9 / 5) + 32);

/**
 * Custom hook for managing temperature unit
 * @returns {Object} Temperature unit state, conversion function, and toggle
 */
export function useTemperatureUnit() {
    const [isCelsius, setIsCelsius] = useState(getSavedUnit);

    // Persist unit preference to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, isCelsius ? 'celsius' : 'fahrenheit');
    }, [isCelsius]);

    /**
     * Convert temperature to current unit
     */
    const displayTemp = useCallback((temp) => {
        return isCelsius ? temp : toFahrenheit(temp);
    }, [isCelsius]);

    /**
     * Get current unit symbol
     */
    const tempUnit = isCelsius ? '°C' : '°F';

    /**
     * Toggle between Celsius and Fahrenheit
     */
    const toggleUnit = () => setIsCelsius(prev => !prev);

    return {
        isCelsius,
        setIsCelsius,
        displayTemp,
        tempUnit,
        toggleUnit
    };
}

export default useTemperatureUnit;
