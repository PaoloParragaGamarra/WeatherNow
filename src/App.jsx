import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useTemperatureUnit } from './hooks/useTemperatureUnit';
import { Icons, getWeatherIcon } from './components/icons/WeatherIcons';
import { getUVLevel, getBackgroundClass, calculateAvgTemp, getDayName, isNighttime } from './utils/weatherHelpers';
import WeatherMap from './components/WeatherMap';
import SunriseSunset from './components/SunriseSunset';
import PrecipitationChart from './components/PrecipitationChart';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hourly'); // 'hourly' or 'daily'

  // Use extracted hooks (SOLID: DIP - Dependency Inversion)
  const { isDarkMode, toggleTheme } = useTheme();
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const { displayTemp, tempUnit, isCelsius, toggleUnit } = useTemperatureUnit();

  const {
    weatherData,
    location,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchWeatherByGeolocation,
    refresh
  } = useWeather();

  // Load default location on mount
  useEffect(() => {
    fetchWeatherByCity('New York');
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherByCity(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Create a location object for favorites
  const currentLocation = location ? {
    name: location.displayName,
    displayName: location.displayName,
    lat: location.lat,
    lon: location.lon
  } : null;

  // Check if current location is a favorite
  const isCurrentFavorite = currentLocation && isFavorite(currentLocation.name);

  // Handle favorite toggle for current location
  const handleToggleFavorite = () => {
    if (currentLocation) {
      toggleFavorite(currentLocation);
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass(weatherData?.current?.condition, isDarkMode)} ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Ambient Light Effects */}
      <div className="ambient-effects">
        <div className="ambient-circle top-right"></div>
        <div className="ambient-circle bottom-left"></div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* Logo & Controls */}
          <div className="logo-row">
            <div className="logo">
              <h1>Weather</h1>
              <div className="logo-underline"></div>
            </div>
            <div className="header-controls">
              {/* Temperature Unit Toggle */}
              <button
                className="unit-toggle"
                onClick={toggleUnit}
                title={isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
              >
                {isCelsius ? '°C' : '°F'}
              </button>
              {/* Theme Toggle */}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search location..."
              className="search-input"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn-primary"
            >
              Search Location
            </button>
            <button
              onClick={fetchWeatherByGeolocation}
              disabled={loading}
              className="btn-secondary"
            >
              <Icons.Navigation style={{ width: '1.25rem', height: '1.25rem' }} />
              Use My Location
            </button>
          </div>

          {/* Favorite Locations */}
          {favorites.length > 0 && (
            <div className="favorites-section">
              <h3>⭐ Favorites</h3>
              <div className="favorites-list">
                {favorites.map((fav, idx) => (
                  <div key={idx} className="favorite-item">
                    <button
                      className="favorite-name"
                      onClick={() => fetchWeatherByCity(fav.displayName.split(',')[0])}
                    >
                      {fav.displayName.split(',')[0]}
                    </button>
                    <button
                      className="favorite-remove"
                      onClick={() => removeFavorite(fav.name || fav.displayName)}
                    >
                      <Icons.X style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Current Weather */}
          {weatherData && (
            <div>
              {/* Location & Actions */}
              <div className="weather-header">
                <div>
                  <h2>Current Weather</h2>
                  <p className="location">{location?.displayName || 'Unknown'}</p>
                </div>
                <div className="header-actions">
                  <button
                    onClick={handleToggleFavorite}
                    className="btn-icon"
                    title={isCurrentFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Icons.Star filled={isCurrentFavorite} className={isCurrentFavorite ? 'icon-amber' : ''} />
                  </button>
                  <button
                    onClick={refresh}
                    disabled={loading}
                    className="btn-icon"
                  >
                    <Icons.RefreshCw className={loading ? 'spin' : ''} />
                  </button>
                </div>
              </div>

              {/* Main Temp Display */}
              <div className="temp-card">
                <div className="temp-display">
                  <div className="temp-icon">
                    {getWeatherIcon(weatherData.current.condition, 'large-icon')}
                  </div>
                  <div className="temp-info">
                    <div className="temp">{displayTemp(weatherData.current.temp)}{tempUnit}</div>
                    <div className="condition">{weatherData.current.description}</div>
                  </div>
                </div>
                <div className="feels-like">
                  Feels like {displayTemp(weatherData.current.feelsLike)}{tempUnit}
                </div>
              </div>

              {/* Sunrise/Sunset Arc */}
              <SunriseSunset
                sunrise={weatherData.current.sunrise}
                sunset={weatherData.current.sunset}
              />

              {/* Detailed Stats */}
              <div className="stats-section">
                <div className="stat-card cyan">
                  <div className="stat-icon cyan">
                    <Icons.Wind />
                  </div>
                  <div>
                    <div className="stat-label">Wind Speed</div>
                    <div className="stat-value">{weatherData.current.wind} km/h</div>
                  </div>
                </div>

                <div className="stat-card blue">
                  <div className="stat-icon blue">
                    <Icons.Droplets />
                  </div>
                  <div>
                    <div className="stat-label">Precipitation</div>
                    <div className="stat-value">{weatherData.hourly[0]?.rain || 0}%</div>
                  </div>
                </div>

                <div className="stat-card teal">
                  <div className="stat-icon teal">
                    <Icons.Droplets />
                  </div>
                  <div>
                    <div className="stat-label">Humidity</div>
                    <div className="stat-value">{weatherData.current.humidity}%</div>
                  </div>
                </div>

                <div className="small-stats-grid">
                  <div className="small-stat">
                    <Icons.Eye />
                    <div className="label">Visibility</div>
                    <div className="value">{weatherData.current.visibility} km</div>
                  </div>
                  <div className="small-stat">
                    <Icons.Gauge />
                    <div className="label">Pressure</div>
                    <div className="value">{weatherData.current.pressure}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside >

      {/* Main Content Area */}
      < main className="main-content" >
        {loading && !weatherData && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="outer"></div>
              <div className="inner"></div>
            </div>
            <h3>Loading Weather Data</h3>
            <p>Please wait a moment...</p>
          </div>
        )}

        {
          weatherData && (
            <>
              {/* Forecast Card with Tabs */}
              <div className="forecast-card">
                <div className="forecast-header">
                  <div>
                    <h3>Weather Forecast</h3>
                    <p>Temperature trends and conditions</p>
                  </div>
                  <div className="forecast-tabs">
                    <button
                      className={`tab ${activeTab === 'hourly' ? 'active' : ''}`}
                      onClick={() => setActiveTab('hourly')}
                    >
                      48 Hours
                    </button>
                    <button
                      className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
                      onClick={() => setActiveTab('daily')}
                    >
                      5 Days
                    </button>
                  </div>
                </div>

                <div className="forecast-content">
                  {activeTab === 'hourly' ? (
                    <>
                      {/* Temperature Chart */}
                      <div className="temp-chart">
                        <div className="chart-bars">
                          {weatherData.hourly && weatherData.hourly.length > 0 && weatherData.hourly.map((hour, idx) => {
                            const temps = weatherData.hourly.map(h => h.temp);
                            const maxTemp = Math.max(...temps);
                            const minTemp = Math.min(...temps);
                            const range = maxTemp - minTemp || 10; // Default range if all temps same
                            // Scale height between 20% and 100%
                            const normalizedHeight = ((hour.temp - minTemp) / range) * 80 + 20;
                            const isCurrent = idx === 0;

                            return (
                              <div key={idx} className="chart-bar-container">
                                <div className="chart-tooltip">
                                  <span>{displayTemp(hour.temp)}°</span>
                                </div>
                                <div
                                  className={`chart-bar ${isCurrent ? 'current' : 'forecast'}`}
                                  style={{ height: `${normalizedHeight}%` }}
                                ></div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="chart-legend">
                          <div className="legend-item">
                            <div className="legend-dot current"></div>
                            <span>Current</span>
                          </div>
                          <div className="legend-item">
                            <div className="legend-dot forecast"></div>
                            <span>Forecast</span>
                          </div>
                        </div>
                      </div>

                      {/* Hourly Scroll */}
                      <div className="hourly-scroll">
                        <div className="hourly-cards">
                          {weatherData.hourly.map((hour, idx) => {
                            const isCurrent = idx === 0;
                            return (
                              <div
                                key={idx}
                                className={`hourly-card ${isCurrent ? 'current' : ''}`}
                              >
                                <div className="hourly-time">
                                  {isCurrent ? 'NOW' : hour.time}
                                </div>
                                <div className="hourly-icon">
                                  {getWeatherIcon(hour.condition)}
                                </div>
                                <div className="hourly-temp">
                                  {displayTemp(hour.temp)}°
                                </div>
                                <div className="hourly-rain">
                                  💧 {hour.rain}%
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* 5-Day Forecast */
                    <div className="daily-forecast">
                      {weatherData.daily.map((day, idx) => (
                        <div key={idx} className={`daily-card ${idx === 0 ? 'today' : ''}`}>
                          <div className="daily-day">{getDayName(day.dt, idx)}</div>
                          <div className="daily-icon">
                            {getWeatherIcon(day.condition)}
                          </div>
                          <div className="daily-condition">{day.condition}</div>
                          <div className="daily-temps">
                            <span className="temp-high">{displayTemp(day.tempMax)}°</span>
                            <span className="temp-low">{displayTemp(day.tempMin)}°</span>
                          </div>
                          <div className="daily-rain">
                            💧 {day.rain}%
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Weather Radar Map */}
              <WeatherMap
                lat={location?.lat}
                lon={location?.lon}
                isDarkMode={isDarkMode}
                onLocationSelect={fetchWeatherByCoords}
              />

              {/* Precipitation Chart */}
              <PrecipitationChart hourlyData={weatherData.hourly} />

              {/* Summary Cards */}
              <div className="summary-grid">
                <div className="summary-card emerald">
                  <Icons.TrendingUp />
                  <div className="label">Next 24 Hours</div>
                  <div className="value">
                    {displayTemp(calculateAvgTemp(weatherData.hourly, 0, 8))}{tempUnit}
                  </div>
                  <div className="sub">Average Temperature</div>
                </div>

                <div className="summary-card blue">
                  <Icons.Activity />
                  <div className="label">Following 24 Hours</div>
                  <div className="value">
                    {displayTemp(calculateAvgTemp(weatherData.hourly, 8, 8))}{tempUnit}
                  </div>
                  <div className="sub">Expected Average</div>
                </div>

                <div className="summary-card purple">
                  <Icons.Sun />
                  <div className="label">UV Index</div>
                  <div className="value">{weatherData.current.uvIndex}</div>
                  <div className="sub">
                    {getUVLevel(weatherData.current.uvIndex)}
                  </div>
                </div>
              </div>
            </>
          )
        }
      </main >
    </div >
  );
}

export default App;
