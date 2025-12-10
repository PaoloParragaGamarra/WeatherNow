/**
 * useFavorites Hook - Favorite locations management
 * Following SRP: Only handles favorites state and persistence
 * Following DIP: Favorites logic is abstracted from components
 */
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'weatherFavorites';

/**
 * Get favorites from localStorage
 */
const getStoredFavorites = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

/**
 * Custom hook for managing favorite locations
 * @returns {Object} Favorites state and management functions
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState(getStoredFavorites);

    // Persist favorites to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    /**
     * Check if a location is in favorites
     */
    const isFavorite = useCallback((locationName) => {
        return favorites.some(fav => fav.name === locationName);
    }, [favorites]);

    /**
     * Add a location to favorites
     */
    const addFavorite = useCallback((location) => {
        if (!isFavorite(location.name)) {
            setFavorites(prev => [...prev, {
                name: location.name,
                displayName: location.displayName,
                lat: location.lat,
                lon: location.lon
            }]);
        }
    }, [isFavorite]);

    /**
     * Remove a location from favorites
     */
    const removeFavorite = useCallback((locationName) => {
        setFavorites(prev => prev.filter(fav => fav.name !== locationName));
    }, []);

    /**
     * Toggle a location in favorites
     */
    const toggleFavorite = useCallback((location) => {
        if (isFavorite(location.name)) {
            removeFavorite(location.name);
        } else {
            addFavorite(location);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    return {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite
    };
}

export default useFavorites;
