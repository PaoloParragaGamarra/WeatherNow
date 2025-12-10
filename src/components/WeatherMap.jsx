import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Fix for default marker icon in Leaflet with Vite
const customIcon = new L.DivIcon({
    className: 'custom-marker',
    html: '<div class="marker-pin">📍</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

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

// Component to handle map resize when expanded/collapsed
function MapResizer({ isExpanded }) {
    const map = useMap();

    useEffect(() => {
        // Delay to allow CSS transition to complete
        const timeout = setTimeout(() => {
            map.invalidateSize();
        }, 300);

        return () => clearTimeout(timeout);
    }, [isExpanded, map]);

    return null;
}

// Component to handle map clicks
function MapClickHandler({ onMapClick, setClickedPosition }) {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setClickedPosition([lat, lng]);
            if (onMapClick) {
                onMapClick(lat, lng);
            }
        }
    });

    return null;
}

export default function WeatherMap({ lat, lon, isDarkMode, onLocationSelect }) {
    const [activeLayer, setActiveLayer] = useState('precipitation');
    const [isExpanded, setIsExpanded] = useState(false);
    const [clickedPosition, setClickedPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const center = lat && lon ? [lat, lon] : [40.7128, -74.0060]; // Default: NYC

    // Base map tiles
    const baseMapUrl = isDarkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const handleMapClick = async (clickLat, clickLon) => {
        if (onLocationSelect) {
            setIsLoading(true);
            try {
                await onLocationSelect(clickLat, clickLon);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Clear clicked position when main location changes
    useEffect(() => {
        setClickedPosition(null);
    }, [lat, lon]);

    return (
        <div className={`weather-map-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="map-header">
                <div className="map-title">
                    <span className="map-icon">🗺️</span>
                    <div>
                        <h3>Weather Radar</h3>
                        <p className="map-subtitle">Click anywhere on the map to get weather</p>
                    </div>
                </div>
                <div className="map-controls">
                    {isLoading && <span className="map-loading">Loading...</span>}
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

                    {/* Handle map resize when expanded/collapsed */}
                    <MapResizer isExpanded={isExpanded} />

                    {/* Handle map clicks */}
                    <MapClickHandler
                        onMapClick={handleMapClick}
                        setClickedPosition={setClickedPosition}
                    />

                    {/* Show marker at current weather location */}
                    <Marker position={center} icon={customIcon}>
                        <Popup>
                            <div className="marker-popup">
                                <strong>Current Location</strong>
                                <br />
                                Lat: {center[0].toFixed(2)}, Lon: {center[1].toFixed(2)}
                            </div>
                        </Popup>
                    </Marker>

                    {/* Show marker at clicked position if different from center */}
                    {clickedPosition && (
                        <Marker position={clickedPosition} icon={customIcon}>
                            <Popup>
                                <div className="marker-popup">
                                    <strong>Selected Location</strong>
                                    <br />
                                    Lat: {clickedPosition[0].toFixed(2)}, Lon: {clickedPosition[1].toFixed(2)}
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>

                {/* Click instruction overlay */}
                <div className="map-instruction">
                    👆 Click map to get weather for that location
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
