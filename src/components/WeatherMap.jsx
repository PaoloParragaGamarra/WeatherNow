import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Layer types available from OpenWeatherMap
const WEATHER_LAYERS = {
    precipitation: {
        name: 'Precipitation',
        url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        icon: '🌧️'
    },
    clouds: {
        name: 'Clouds',
        url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        icon: '☁️'
    },
    temperature: {
        name: 'Temperature',
        url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        icon: '🌡️'
    },
    wind: {
        name: 'Wind',
        url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        icon: '💨'
    },
    pressure: {
        name: 'Pressure',
        url: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        icon: '📊'
    }
};

// Component to update map center when location changes
function MapUpdater({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}

export default function WeatherMap({ lat, lon, isDarkMode }) {
    const [activeLayer, setActiveLayer] = useState('precipitation');
    const [isExpanded, setIsExpanded] = useState(false);

    const center = lat && lon ? [lat, lon] : [40.7128, -74.0060]; // Default: NYC

    // Base map tiles - using CartoDB for better look
    const baseMapUrl = isDarkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <div className={`weather-map-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="map-header">
                <div className="map-title">
                    <span className="map-icon">🗺️</span>
                    <h3>Weather Radar</h3>
                </div>
                <div className="map-controls">
                    <button
                        className="expand-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '⊖' : '⊕'}
                    </button>
                </div>
            </div>

            {/* Layer selector */}
            <div className="layer-selector">
                {Object.entries(WEATHER_LAYERS).map(([key, layer]) => (
                    <button
                        key={key}
                        className={`layer-btn ${activeLayer === key ? 'active' : ''}`}
                        onClick={() => setActiveLayer(key)}
                        title={layer.name}
                    >
                        <span className="layer-icon">{layer.icon}</span>
                        <span className="layer-name">{layer.name}</span>
                    </button>
                ))}
            </div>

            {/* Map */}
            <div className="map-wrapper">
                <MapContainer
                    center={center}
                    zoom={6}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={true}
                    scrollWheelZoom={true}
                >
                    {/* Base map layer */}
                    <TileLayer
                        url={baseMapUrl}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {/* Weather layer */}
                    <TileLayer
                        url={WEATHER_LAYERS[activeLayer].url}
                        opacity={0.7}
                    />

                    {/* Update map center when location changes */}
                    <MapUpdater center={center} />
                </MapContainer>

                {/* Location marker overlay */}
                <div className="location-marker" title="Current Location">
                    📍
                </div>
            </div>

            {/* Legend */}
            <div className="map-legend">
                <span className="legend-label">
                    {WEATHER_LAYERS[activeLayer].icon} {WEATHER_LAYERS[activeLayer].name} Layer
                </span>
                {activeLayer === 'precipitation' && (
                    <div className="legend-scale precipitation">
                        <span>Light</span>
                        <div className="scale-bar"></div>
                        <span>Heavy</span>
                    </div>
                )}
                {activeLayer === 'temperature' && (
                    <div className="legend-scale temperature">
                        <span>Cold</span>
                        <div className="scale-bar"></div>
                        <span>Hot</span>
                    </div>
                )}
            </div>
        </div>
    );
}
