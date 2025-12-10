import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import './App.css';

// Icons as simple SVG components
const Icons = {
  Sun: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Cloud: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  CloudRain: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 13v8M8 13v8M12 15v8" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  ),
  Wind: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Droplets: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  ),
  Navigation: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  RefreshCw: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Gauge: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
      <path d="M12 12l5-5" />
    </svg>
  ),
  TrendingUp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Activity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Snowflake: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 7l-5 5-5-5M7 17l5-5 5 5" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  Thunderstorm: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
      <polyline points="13 11 9 17 15 17 11 23" />
    </svg>
  )
};

// Get weather icon based on condition
const getWeatherIcon = (condition, className = '') => {
  switch (condition) {
    case 'Clear':
      return <Icons.Sun className={`${className} icon-amber`} />;
    case 'Rain':
    case 'Drizzle':
      return <Icons.CloudRain className={`${className} icon-blue`} />;
    case 'Clouds':
      return <Icons.Cloud className={`${className} icon-slate`} />;
    case 'Snow':
      return <Icons.Snowflake className={`${className} icon-blue-light`} />;
    case 'Thunderstorm':
      return <Icons.Thunderstorm className={`${className} icon-yellow`} />;
    default:
      return <Icons.Cloud className={`${className} icon-slate`} />;
  }
};

// Get UV level text
const getUVLevel = (uvi) => {
  if (uvi < 3) return 'Low';
  if (uvi < 6) return 'Moderate';
  if (uvi < 8) return 'High';
  if (uvi < 11) return 'Very High';
  return 'Extreme';
};

// Get background class based on conditions
const getBackgroundClass = (condition) => {
  if (!condition) return 'bg-default';

  const hour = new Date().getHours();
  const isEvening = hour >= 17 && hour < 20;
  const isNight = hour >= 20 || hour < 6;

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

// Calculate average temperature
const calculateAvgTemp = (hourlyData, startIndex, count) => {
  const slice = hourlyData.slice(startIndex, startIndex + count);
  if (slice.length === 0) return 0;
  const sum = slice.reduce((acc, hour) => acc + hour.temp, 0);
  return Math.round(sum / slice.length);
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    weatherData,
    location,
    loading,
    error,
    fetchWeatherByCity,
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

  return (
    <div className={`app-container ${getBackgroundClass(weatherData?.current?.condition)}`}>
      {/* Ambient Light Effects */}
      <div className="ambient-effects">
        <div className="ambient-circle top-right"></div>
        <div className="ambient-circle bottom-left"></div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* Logo */}
          <div className="logo">
            <h1>Weather</h1>
            <div className="logo-underline"></div>
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
              <Icons.Navigation className="" style={{ width: '1.25rem', height: '1.25rem' }} />
              Use My Location
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Current Weather */}
          {weatherData && (
            <div>
              {/* Location & Refresh */}
              <div className="weather-header">
                <div>
                  <h2>Current Weather</h2>
                  <p className="location">{location?.displayName || 'Unknown'}</p>
                </div>
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="btn-icon"
                >
                  <Icons.RefreshCw className={loading ? 'spin' : ''} />
                </button>
              </div>

              {/* Main Temp Display */}
              <div className="temp-card">
                <div className="temp-display">
                  <div className="icon">
                    {getWeatherIcon(weatherData.current.condition)}
                  </div>
                  <div>
                    <div className="temp">{weatherData.current.temp}°</div>
                    <div className="condition">{weatherData.current.condition}</div>
                  </div>
                </div>
                <div className="feels-like">
                  Feels like {weatherData.current.feelsLike}°C
                </div>
              </div>

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
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
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

        {weatherData && (
          <>
            {/* Temperature Graph Card */}
            <div className="forecast-card">
              <div className="forecast-header">
                <h3>48-Hour Forecast</h3>
                <p>Temperature trends and conditions</p>
              </div>

              <div className="forecast-content">
                {/* Temperature Chart */}
                <div className="temp-chart">
                  <div className="chart-bars">
                    {weatherData.hourly.map((hour, idx) => {
                      const maxTemp = Math.max(...weatherData.hourly.map(h => h.temp));
                      const minTemp = Math.min(...weatherData.hourly.map(h => h.temp));
                      const range = maxTemp - minTemp || 1;
                      const height = ((hour.temp - minTemp) / range) * 100;
                      const isCurrent = idx === 0;

                      return (
                        <div key={idx} className="chart-bar-container">
                          <div className="chart-tooltip">
                            <span>{hour.temp}°</span>
                          </div>
                          <div
                            className={`chart-bar ${isCurrent ? 'current' : 'forecast'}`}
                            style={{ height: `${Math.max(height, 5)}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-dot current"></div>
                      <span>Current Hour</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-dot forecast"></div>
                      <span>Forecast</span>
                    </div>
                  </div>
                </div>

                {/* Hourly Details Scroll */}
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
                            {hour.temp}°
                          </div>
                          <div className="hourly-rain">
                            💧 {hour.rain}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="summary-grid">
              <div className="summary-card emerald">
                <Icons.TrendingUp />
                <div className="label">Next 24 Hours</div>
                <div className="value">
                  {calculateAvgTemp(weatherData.hourly, 0, 8)}°C
                </div>
                <div className="sub">Average Temperature</div>
              </div>

              <div className="summary-card blue">
                <Icons.Activity />
                <div className="label">Following 24 Hours</div>
                <div className="value">
                  {calculateAvgTemp(weatherData.hourly, 8, 8)}°C
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
        )}
      </main>
    </div>
  );
}

export default App;
