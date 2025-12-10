const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

/**
 * Search for locations by city name using Geocoding API (FREE)
 * @param {string} query - City name to search
 * @param {number} limit - Max number of results (default 5)
 * @returns {Promise<Array>} Array of location results
 */
export async function searchLocations(query, limit = 5) {
    if (!query.trim()) return [];

    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;

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
 * Get current weather data (FREE - no subscription required)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Current weather data
 */
async function getCurrentWeather(lat, lon) {
    const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Weather API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Get 5-day/3-hour forecast (FREE - no subscription required)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Forecast data
 */
async function getForecast(lat, lon) {
    const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Forecast API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Get weather data combining current + forecast (FREE APIs)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Combined weather data
 */
export async function getWeatherData(lat, lon) {
    const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon)
    ]);

    return transformWeatherData(currentData, forecastData);
}

/**
 * Get reverse geocoding (coordinates to location name)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Location info
 */
export async function reverseGeocode(lat, lon) {
    const url = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

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
 * Uses Current Weather API + 5 Day Forecast API (both FREE)
 */
function transformWeatherData(currentData, forecastData) {
    const current = {
        temp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind: Math.round(currentData.wind.speed * 3.6), // m/s to km/h
        visibility: Math.round((currentData.visibility || 10000) / 1000), // m to km
        uvIndex: 0, // Not available in free API, will show 0
        dewPoint: 0, // Not available in free API
        clouds: currentData.clouds?.all || 0,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset
    };

    // Transform 5-day/3-hour forecast to hourly format
    // Free API provides data every 3 hours for 5 days (40 entries)
    const hourly = forecastData.list.slice(0, 16).map((item, index) => ({
        dt: item.dt,
        time: formatTime(item.dt),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        rain: Math.round((item.pop || 0) * 100), // probability of precipitation
        wind: Math.round(item.wind.speed * 3.6),
        isCurrent: index === 0
    }));

    // Create daily summary from forecast data
    const dailyMap = new Map();
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                temps: [],
                conditions: [],
                pops: [],
                dt: item.dt
            });
        }
        dailyMap.get(date).temps.push(item.main.temp);
        dailyMap.get(date).conditions.push(item.weather[0].main);
        dailyMap.get(date).pops.push(item.pop || 0);
    });

    const daily = Array.from(dailyMap.values()).slice(0, 5).map(day => ({
        dt: day.dt,
        tempMin: Math.round(Math.min(...day.temps)),
        tempMax: Math.round(Math.max(...day.temps)),
        condition: getMostFrequent(day.conditions),
        rain: Math.round(Math.max(...day.pops) * 100)
    }));

    return {
        current,
        hourly,
        daily,
        timezone: forecastData.city?.timezone || 0,
        alerts: []
    };
}

/**
 * Get most frequent item in array
 */
function getMostFrequent(arr) {
    const counts = {};
    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

/**
 * Format Unix timestamp to HH:00 format
 */
function formatTime(unix) {
    const date = new Date(unix * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
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
