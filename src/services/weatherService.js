const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/3.0';

/**
 * Search for locations by city name using Geocoding API
 * @param {string} query - City name to search
 * @param {number} limit - Max number of results (default 5)
 * @returns {Promise<Array>} Array of location results
 */
export async function searchLocations(query, limit = 5) {
    if (!query.trim()) return [];

    const url = `${GEO_BASE_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    return data.map(location => ({
        name: location.name,
        country: location.country,
        state: location.state || '',
        lat: location.lat,
        lon: location.lon,
        displayName: location.state
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`
    }));
}

/**
 * Get weather data for a location using One Call API 3.0
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data including current, hourly, and daily
 */
export async function getWeatherData(lat, lon) {
    const url = `${WEATHER_BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return transformWeatherData(data);
}

/**
 * Get reverse geocoding (coordinates to location name)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Location info
 */
export async function reverseGeocode(lat, lon) {
    const url = `${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Reverse geocoding error: ${response.status}`);
    }

    const data = await response.json();
    if (data.length === 0) {
        return { displayName: 'Unknown Location' };
    }

    const location = data[0];
    return {
        name: location.name,
        country: location.country,
        state: location.state || '',
        displayName: location.state
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`
    };
}

/**
 * Transform API data to app format
 */
function transformWeatherData(data) {
    const current = {
        temp: Math.round(data.current.temp),
        feelsLike: Math.round(data.current.feels_like),
        condition: data.current.weather[0].main,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        wind: Math.round(data.current.wind_speed * 3.6), // m/s to km/h
        visibility: Math.round(data.current.visibility / 1000), // m to km
        uvIndex: Math.round(data.current.uvi),
        dewPoint: Math.round(data.current.dew_point),
        clouds: data.current.clouds,
        sunrise: data.current.sunrise,
        sunset: data.current.sunset
    };

    // Transform hourly data (48 hours)
    const hourly = data.hourly.slice(0, 48).map((hour, index) => ({
        dt: hour.dt,
        time: formatTime(hour.dt, data.timezone_offset),
        temp: Math.round(hour.temp),
        condition: hour.weather[0].main,
        icon: hour.weather[0].icon,
        rain: Math.round(hour.pop * 100), // probability of precipitation
        wind: Math.round(hour.wind_speed * 3.6),
        isCurrent: index === 0
    }));

    // Transform daily data (8 days)
    const daily = data.daily.slice(0, 8).map(day => ({
        dt: day.dt,
        tempMin: Math.round(day.temp.min),
        tempMax: Math.round(day.temp.max),
        condition: day.weather[0].main,
        icon: day.weather[0].icon,
        rain: Math.round(day.pop * 100),
        summary: day.summary || ''
    }));

    return {
        current,
        hourly,
        daily,
        timezone: data.timezone,
        timezoneOffset: data.timezone_offset,
        alerts: data.alerts || []
    };
}

/**
 * Format Unix timestamp to HH:00 format
 */
function formatTime(unix, timezoneOffset = 0) {
    const date = new Date((unix + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    return `${hours}:00`;
}

/**
 * Get current position using browser geolocation
 * @returns {Promise<{lat: number, lon: number}>}
 */
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                let message = 'Unable to get your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out';
                        break;
                }
                reject(new Error(message));
            },
            { timeout: 10000, enableHighAccuracy: false }
        );
    });
}
