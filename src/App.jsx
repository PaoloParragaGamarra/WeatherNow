import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import './App.css';

// Icons as simple SVG components for consistency
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
      <path d="M7 7l5 5m5-5l-5 5m-5 5l5-5m5 5l-5-5" />
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
const getWeatherIcon = (condition, size = 'w-8 h-8') => {
  const iconClass = `${size}`;
  switch (condition) {
    case 'Clear':
      return <Icons.Sun className={`${iconClass} text-amber-400`} />;
    case 'Rain':
    case 'Drizzle':
      return <Icons.CloudRain className={`${iconClass} text-blue-400`} />;
    case 'Clouds':
      return <Icons.Cloud className={`${iconClass} text-slate-300`} />;
    case 'Snow':
      return <Icons.Snowflake className={`${iconClass} text-blue-200`} />;
    case 'Thunderstorm':
      return <Icons.Thunderstorm className={`${iconClass} text-yellow-400`} />;
    default:
      return <Icons.Cloud className={`${iconClass} text-slate-400`} />;
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
  if (!condition) return 'from-slate-900 via-slate-800 to-slate-900';

  const hour = new Date().getHours();
  const isEvening = hour >= 17 && hour < 20;
  const isNight = hour >= 20 || hour < 6;

  switch (condition) {
    case 'Clear':
      if (isNight) return 'from-indigo-950 via-slate-900 to-slate-950';
      if (isEvening) return 'from-orange-600 via-rose-700 to-purple-900';
      return 'from-sky-600 via-blue-700 to-indigo-800';
    case 'Rain':
    case 'Drizzle':
      return 'from-slate-800 via-slate-900 to-slate-950';
    case 'Clouds':
      return 'from-slate-700 via-slate-800 to-slate-900';
    case 'Snow':
      return 'from-slate-400 via-blue-500 to-slate-600';
    case 'Thunderstorm':
      return 'from-gray-800 via-slate-900 to-gray-950';
    default:
      return 'from-slate-800 via-slate-900 to-blue-950';
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
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(weatherData?.current?.condition)} transition-all duration-1000 relative overflow-hidden`}>
      {/* Ambient Light Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-96 bg-black/40 backdrop-blur-2xl border-r border-white/10 shadow-2xl z-10">
        <div className="p-8 h-full overflow-y-auto">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Weather</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>

          {/* Search */}
          <div className="mb-10 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search location..."
                className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all font-medium backdrop-blur-xl"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full px-5 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50"
            >
              Search Location
            </button>
            <button
              onClick={fetchWeatherByGeolocation}
              disabled={loading}
              className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 border border-white/20 disabled:opacity-50"
            >
              <Icons.Navigation className="w-5 h-5" />
              Use My Location
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Current Weather */}
          {weatherData && (
            <div className="space-y-6">
              {/* Location & Refresh */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Current Weather</h2>
                  <p className="text-white/60 text-sm font-medium">{location?.displayName || 'Unknown'}</p>
                </div>
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="p-3 hover:bg-white/10 rounded-xl transition-all hover:scale-110 disabled:opacity-50"
                >
                  <Icons.RefreshCw className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Main Temp Display */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-5 mb-6">
                  {getWeatherIcon(weatherData.current.condition, 'w-20 h-20')}
                  <div>
                    <div className="text-6xl font-bold text-white leading-none mb-2">{weatherData.current.temp}°</div>
                    <div className="text-white/90 text-lg font-semibold">{weatherData.current.condition}</div>
                  </div>
                </div>
                <div className="text-white/60 text-sm font-medium pt-4 border-t border-white/10">
                  Feels like {weatherData.current.feelsLike}°C
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-5 border border-cyan-400/30 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/30 rounded-xl">
                        <Icons.Wind className="w-6 h-6 text-cyan-200" />
                      </div>
                      <div>
                        <div className="text-white/70 text-sm font-semibold mb-1">Wind Speed</div>
                        <div className="text-white text-2xl font-bold">{weatherData.current.wind} km/h</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl rounded-2xl p-5 border border-blue-400/30 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/30 rounded-xl">
                        <Icons.Droplets className="w-6 h-6 text-blue-200" />
                      </div>
                      <div>
                        <div className="text-white/70 text-sm font-semibold mb-1">Precipitation</div>
                        <div className="text-white text-2xl font-bold">{weatherData.hourly[0]?.rain || 0}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-5 border border-teal-400/30 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-teal-500/30 rounded-xl">
                        <Icons.Droplets className="w-6 h-6 text-teal-200" />
                      </div>
                      <div>
                        <div className="text-white/70 text-sm font-semibold mb-1">Humidity</div>
                        <div className="text-white text-2xl font-bold">{weatherData.current.humidity}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                    <Icons.Eye className="w-5 h-5 text-white/70 mb-2" />
                    <div className="text-white/60 text-xs font-semibold mb-1">Visibility</div>
                    <div className="text-white text-lg font-bold">{weatherData.current.visibility} km</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                    <Icons.Gauge className="w-5 h-5 text-white/70 mb-2" />
                    <div className="text-white/60 text-xs font-semibold mb-1">Pressure</div>
                    <div className="text-white text-lg font-bold">{weatherData.current.pressure}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-96 p-10 relative z-0">
        {loading && !weatherData && (
          <div className="flex flex-col items-center justify-center h-[85vh]">
            <div className="relative mb-8">
              <div className="w-28 h-28 border-8 border-white/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-28 h-28 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white text-2xl font-bold mb-2">Loading Weather Data</p>
            <p className="text-white/60 font-medium">Please wait a moment...</p>
          </div>
        )}

        {weatherData && (
          <div className="space-y-8">
            {/* Temperature Graph Card */}
            <div className="bg-black/30 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-white/10">
                <h3 className="text-3xl font-bold text-white mb-1">48-Hour Forecast</h3>
                <p className="text-white/60 font-medium">Temperature trends and conditions</p>
              </div>

              <div className="p-8">
                {/* Temperature Graph */}
                <div className="mb-10 bg-black/20 rounded-3xl p-6 border border-white/10">
                  <div className="h-64 relative mb-4">
                    <div className="absolute inset-0 flex items-end">
                      {weatherData.hourly.map((hour, idx) => {
                        const maxTemp = Math.max(...weatherData.hourly.map(h => h.temp));
                        const minTemp = Math.min(...weatherData.hourly.map(h => h.temp));
                        const range = maxTemp - minTemp || 1;
                        const height = ((hour.temp - minTemp) / range) * 100;
                        const isCurrent = idx === 0;

                        return (
                          <div
                            key={idx}
                            className="relative flex-1 flex flex-col items-center justify-end group"
                          >
                            {/* Temperature Label on Hover */}
                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-lg z-10">
                              <span className="text-sm font-bold text-gray-800">{hour.temp}°</span>
                            </div>

                            {/* Bar */}
                            <div
                              className={`w-full transition-all duration-300 rounded-t-lg ${isCurrent
                                  ? 'bg-gradient-to-t from-blue-400 to-purple-500 shadow-lg shadow-blue-500/50'
                                  : 'bg-gradient-to-t from-blue-300/60 to-purple-400/60'
                                } ${isCurrent ? 'scale-x-125' : 'group-hover:scale-y-105'}`}
                              style={{ height: `${Math.max(height, 5)}%` }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="border-t border-white/5"></div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      <span className="text-white/80">Current Hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3 bg-gradient-to-r from-blue-300/60 to-purple-400/60 rounded-full"></div>
                      <span className="text-white/80">Forecast</span>
                    </div>
                  </div>
                </div>

                {/* Hourly Details Scroll */}
                <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="flex gap-3 min-w-max">
                    {weatherData.hourly.map((hour, idx) => {
                      const isCurrent = idx === 0;
                      return (
                        <div
                          key={idx}
                          className={`flex-shrink-0 transition-all duration-300 ${isCurrent ? 'scale-110' : 'hover:scale-105'
                            }`}
                        >
                          <div
                            className={`w-28 p-5 rounded-2xl text-center shadow-lg border-2 ${isCurrent
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 shadow-blue-500/30'
                                : 'bg-white/10 border-white/20'
                              }`}
                          >
                            <div className={`text-xs font-bold mb-3 tracking-wide ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                              {isCurrent ? 'NOW' : hour.time}
                            </div>
                            <div className="flex justify-center mb-3">
                              {getWeatherIcon(hour.condition, 'w-10 h-10')}
                            </div>
                            <div className={`text-3xl font-bold mb-2 ${isCurrent ? 'text-white' : 'text-white'}`}>
                              {hour.temp}°
                            </div>
                            <div className={`text-xs font-semibold ${isCurrent ? 'text-blue-100' : 'text-white/60'}`}>
                              💧 {hour.rain}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-400/30 shadow-xl">
                <Icons.TrendingUp className="w-10 h-10 text-emerald-300 mb-4" />
                <h4 className="text-white/70 text-sm font-bold mb-2 uppercase tracking-wide">Next 24 Hours</h4>
                <div className="text-white text-4xl font-bold">
                  {calculateAvgTemp(weatherData.hourly, 0, 24)}°C
                </div>
                <div className="text-emerald-200 text-sm font-semibold mt-2">Average Temperature</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-2xl rounded-3xl p-8 border border-blue-400/30 shadow-xl">
                <Icons.Activity className="w-10 h-10 text-blue-300 mb-4" />
                <h4 className="text-white/70 text-sm font-bold mb-2 uppercase tracking-wide">Following 24 Hours</h4>
                <div className="text-white text-4xl font-bold">
                  {calculateAvgTemp(weatherData.hourly, 24, 24)}°C
                </div>
                <div className="text-blue-200 text-sm font-semibold mt-2">Expected Average</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-2xl rounded-3xl p-8 border border-purple-400/30 shadow-xl">
                <Icons.Sun className="w-10 h-10 text-purple-300 mb-4" />
                <h4 className="text-white/70 text-sm font-bold mb-2 uppercase tracking-wide">UV Index</h4>
                <div className="text-white text-4xl font-bold">{weatherData.current.uvIndex}</div>
                <div className="text-purple-200 text-sm font-semibold mt-2">
                  {getUVLevel(weatherData.current.uvIndex)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
