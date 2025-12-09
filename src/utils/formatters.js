/**
 * Get UV Index level description
 * @param {number} uvi - UV Index value
 * @returns {string} Level description
 */
export function getUVLevel(uvi) {
    if (uvi < 3) return 'Low';
    if (uvi < 6) return 'Moderate';
    if (uvi < 8) return 'High';
    if (uvi < 11) return 'Very High';
    return 'Extreme';
}

/**
 * Format temperature with degree symbol
 * @param {number} temp - Temperature value
 * @returns {string} Formatted temperature
 */
export function formatTemp(temp) {
    return `${Math.round(temp)}°`;
}

/**
 * Format wind speed
 * @param {number} speed - Wind speed in km/h
 * @returns {string} Formatted wind speed
 */
export function formatWindSpeed(speed) {
    return `${Math.round(speed)} km/h`;
}

/**
 * Format visibility
 * @param {number} visibility - Visibility in km
 * @returns {string} Formatted visibility
 */
export function formatVisibility(visibility) {
    return `${visibility} km`;
}

/**
 * Get time of day category
 * @param {number} hour - Hour (0-23)
 * @returns {string} 'night' | 'morning' | 'day' | 'evening'
 */
export function getTimeOfDay(hour) {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
}

/**
 * Get background gradient based on weather and time
 * @param {string} condition - Weather condition
 * @returns {string} CSS gradient class
 */
export function getBackgroundClass(condition) {
    const hour = new Date().getHours();
    const timeOfDay = getTimeOfDay(hour);

    const backgrounds = {
        Clear: {
            night: 'from-indigo-950 via-slate-900 to-slate-950',
            morning: 'from-amber-400 via-orange-500 to-rose-600',
            day: 'from-sky-600 via-blue-700 to-indigo-800',
            evening: 'from-orange-600 via-rose-700 to-purple-900'
        },
        Clouds: {
            night: 'from-slate-800 via-slate-900 to-slate-950',
            morning: 'from-slate-500 via-slate-600 to-slate-700',
            day: 'from-slate-700 via-slate-800 to-slate-900',
            evening: 'from-slate-700 via-slate-800 to-purple-900'
        },
        Rain: {
            night: 'from-slate-900 via-slate-950 to-gray-950',
            morning: 'from-slate-600 via-slate-700 to-slate-800',
            day: 'from-slate-800 via-slate-900 to-slate-950',
            evening: 'from-slate-800 via-slate-900 to-gray-950'
        },
        Thunderstorm: {
            night: 'from-gray-900 via-slate-950 to-black',
            morning: 'from-gray-700 via-slate-800 to-slate-900',
            day: 'from-gray-800 via-slate-900 to-gray-950',
            evening: 'from-gray-900 via-slate-950 to-black'
        },
        Snow: {
            night: 'from-slate-800 via-blue-900 to-slate-950',
            morning: 'from-blue-200 via-slate-300 to-blue-400',
            day: 'from-slate-400 via-blue-500 to-slate-600',
            evening: 'from-slate-600 via-blue-700 to-slate-800'
        },
        Drizzle: {
            night: 'from-slate-800 via-slate-900 to-gray-950',
            morning: 'from-slate-500 via-slate-600 to-slate-700',
            day: 'from-slate-700 via-slate-800 to-slate-900',
            evening: 'from-slate-700 via-slate-800 to-gray-900'
        }
    };

    const conditionBg = backgrounds[condition] || backgrounds.Clouds;
    return conditionBg[timeOfDay] || conditionBg.day;
}

/**
 * Calculate average temperature from hourly data
 * @param {Array} hourlyData - Array of hourly weather data
 * @param {number} startIndex - Start index
 * @param {number} count - Number of hours
 * @returns {number} Average temperature
 */
export function calculateAvgTemp(hourlyData, startIndex, count) {
    const slice = hourlyData.slice(startIndex, startIndex + count);
    if (slice.length === 0) return 0;

    const sum = slice.reduce((acc, hour) => acc + hour.temp, 0);
    return Math.round(sum / slice.length);
}
