/**
 * Weather Helper Functions
 * Following SRP: Utility functions for weather data
 */

/**
 * Get UV level description from UV index
 * @param {number} uvi - UV index value
 * @returns {string} UV level description
 */
export const getUVLevel = (uvi) => {
    if (uvi < 3) return 'Low';
    if (uvi < 6) return 'Moderate';
    if (uvi < 8) return 'High';
    if (uvi < 11) return 'Very High';
    return 'Extreme';
};

/**
 * Get background class based on weather condition and theme
 * @param {string} condition - Weather condition
 * @param {boolean} isDark - Dark mode flag
 * @returns {string} CSS class name
 */
export const getBackgroundClass = (condition, isDark) => {
    if (!condition) return isDark ? 'bg-dark-default' : 'bg-light-default';

    const hour = new Date().getHours();
    const isEvening = hour >= 17 && hour < 20;
    const isNight = hour >= 20 || hour < 6;

    if (!isDark) {
        // Light mode backgrounds
        switch (condition) {
            case 'Clear':
                return 'bg-light-sunny';
            case 'Rain':
            case 'Drizzle':
                return 'bg-light-rainy';
            case 'Clouds':
                return 'bg-light-cloudy';
            default:
                return 'bg-light-default';
        }
    }

    // Dark mode backgrounds
    switch (condition) {
        case 'Clear':
            if (isNight) return 'bg-sunny-night';
            if (isEvening) return 'bg-sunny-evening';
            return 'bg-sunny';
        case 'Rain':
        case 'Drizzle':
            return 'bg-rainy';
        case 'Clouds':
            return 'bg-cloudy';
        default:
            return 'bg-default';
    }
};

/**
 * Calculate average temperature from hourly data
 * @param {Array} hourlyData - Array of hourly weather data
 * @param {number} startIndex - Start index
 * @param {number} count - Number of hours to average
 * @returns {number} Average temperature
 */
export const calculateAvgTemp = (hourlyData, startIndex, count) => {
    const slice = hourlyData.slice(startIndex, startIndex + count);
    if (slice.length === 0) return 0;
    const sum = slice.reduce((acc, hour) => acc + hour.temp, 0);
    return Math.round(sum / slice.length);
};

/**
 * Format day name from timestamp
 * @param {number} timestamp - Unix timestamp
 * @param {number} index - Day index (0 = today)
 * @returns {string} Formatted day name
 */
export const getDayName = (timestamp, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Check if current time is nighttime
 * @returns {boolean} True if nighttime
 */
export const isNighttime = () => {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6;
};
