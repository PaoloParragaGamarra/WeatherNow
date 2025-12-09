import { useState, useCallback } from 'react';
import {
    getWeatherData,
    searchLocations,
    reverseGeocode,
    getCurrentPosition
} from '../services/weatherService';

/**
 * Custom hook for managing weather data
 */
export function useWeather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch weather for specific coordinates
     */
    const fetchWeatherByCoords = useCallback(async (lat, lon, locationInfo = null) => {
        setLoading(true);
        setError(null);

        try {
            // Get location name if not provided
            if (!locationInfo) {
                locationInfo = await reverseGeocode(lat, lon);
            }

            const data = await getWeatherData(lat, lon);
            setWeatherData(data);
            setLocation({
                ...locationInfo,
                lat,
                lon
            });
        } catch (err) {
            setError(err.message);
            console.error('Weather fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Search and fetch weather for a city
     */
    const fetchWeatherByCity = useCallback(async (cityName) => {
        setLoading(true);
        setError(null);

        try {
            const locations = await searchLocations(cityName, 1);

            if (locations.length === 0) {
                throw new Error(`Location "${cityName}" not found`);
            }

            const loc = locations[0];
            await fetchWeatherByCoords(loc.lat, loc.lon, loc);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('City search error:', err);
        }
    }, [fetchWeatherByCoords]);

    /**
     * Fetch weather for current browser location
     */
    const fetchWeatherByGeolocation = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const position = await getCurrentPosition();
            await fetchWeatherByCoords(position.lat, position.lon);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('Geolocation error:', err);
        }
    }, [fetchWeatherByCoords]);

    /**
     * Refresh current weather data
     */
    const refresh = useCallback(async () => {
        if (location) {
            await fetchWeatherByCoords(location.lat, location.lon, location);
        }
    }, [location, fetchWeatherByCoords]);

    return {
        weatherData,
        location,
        loading,
        error,
        fetchWeatherByCity,
        fetchWeatherByCoords,
        fetchWeatherByGeolocation,
        refresh
    };
}
