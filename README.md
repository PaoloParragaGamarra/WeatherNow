# 🌤️ Weather App

A beautiful, modern weather application that shows real-time weather conditions for any location in the world.

---

## 🎯 What Does This App Do?

This app tells you the weather! Simply type in a city name or use your current location, and you'll see:

- **Current temperature** and how it "feels like"
- **Weather conditions** (sunny, cloudy, rainy, etc.)
- **48-hour forecast** showing upcoming weather
- **5-day forecast** to plan your week
- **Interactive weather map** with radar showing rain, clouds, temperature, and wind
- **Sunrise & sunset times** with a visual sun position arc

### ✨ Special Features

| Feature | Description |
|---------|-------------|
| 🌓 **Dark/Light Mode** | Easy on your eyes, day or night |
| ⭐ **Favorites** | Save your favorite cities for quick access |
| 🌡️ **°C / °F Toggle** | Switch between Celsius and Fahrenheit |
| 🗺️ **Click-on-Map** | Click anywhere on the map to see that location's weather |

---

## 🚀 Getting Started

### For Everyone (Non-Coders)

1. **Get an API Key** (free):
   - Go to [OpenWeatherMap](https://openweathermap.org/api) and create a free account
   - Copy your API key from the dashboard

2. **Set Up the App**:
   - Download this project
   - Create a file called `.env` in the main folder
   - Add this line: `VITE_OPENWEATHER_API_KEY=your_api_key_here`

3. **Run the App**:
   - Install [Node.js](https://nodejs.org/) (download the LTS version)
   - Open a terminal in the project folder
   - Run: `npm install` (wait for it to finish)
   - Run: `npm run dev`
   - Open <http://localhost:5173> in your browser

### For Developers

```bash
# Clone the repository
git clone <repository-url>
cd WeatherApp

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🏗️ Project Structure

```
WeatherApp/
├── src/
│   ├── components/          # UI components
│   │   ├── icons/           # SVG weather icons
│   │   ├── WeatherMap.jsx   # Interactive map with radar
│   │   ├── SunriseSunset.jsx # Sun position arc
│   │   └── PrecipitationChart.jsx # Rain probability chart
│   ├── hooks/               # React custom hooks
│   │   ├── useWeather.js    # Weather data fetching
│   │   ├── useTheme.js      # Dark/light mode
│   │   ├── useFavorites.js  # Saved locations
│   │   └── useTemperatureUnit.js # °C/°F toggle
│   ├── services/            # API communication
│   │   └── weatherService.js # OpenWeatherMap API calls
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main application
│   └── App.css              # Styling
├── .env.example             # Environment template
└── package.json             # Project dependencies
```

---

## 🔧 Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | User interface framework |
| **Vite** | Fast development server |
| **Leaflet** | Interactive maps |
| **OpenWeatherMap API** | Weather data source |
| **CSS3** | Styling with glassmorphism effects |

---

## 📱 Features in Detail

### Weather Data

- **Current conditions**: Temperature, humidity, wind speed, visibility, pressure
- **Hourly forecast**: Next 48 hours with 3-hour intervals
- **Daily forecast**: 5-day outlook with high/low temperatures

### User Preferences

All preferences are **saved automatically** in your browser:

- Theme (dark/light mode)
- Temperature unit (Celsius/Fahrenheit)
- Favorite locations

### Weather Map

- **5 layers**: Precipitation, Clouds, Temperature, Wind, Pressure
- **Click to check weather**: Click any location on the map
- **Expand/collapse**: Full-screen mode available

---

## 🔒 Privacy & Security

- Your **API key stays on your computer** (in the `.env` file)
- **No data is sent to external servers** except OpenWeatherMap
- **Favorites are stored locally** in your browser (localStorage)

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Location unavailable" | Enable location services in your browser/device settings |
| Map tiles not loading | Check your internet connection |
| Weather not updating | Click the refresh button (🔄) next to the current weather |
| API errors | Verify your API key is correct in the `.env` file |

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 🙏 Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Maps powered by [Leaflet](https://leafletjs.com/) and [CARTO](https://carto.com/)
- Icons designed in-house as SVG components
