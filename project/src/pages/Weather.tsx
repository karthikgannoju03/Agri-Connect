import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Thermometer, Droplet, Wind, Calendar, Search, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

// Sample data (in a real app, this would come from a weather API)
const weatherData = {
  location: "Hyderabad, Telangana",
  current: {
    temperature: 32,
    feelsLike: 34,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    precipitation: 0,
    lastUpdated: new Date().toISOString()
  },
  forecast: [
    { date: "2025-04-12", maxTemp: 33, minTemp: 25, condition: "Sunny" },
    { date: "2025-04-13", maxTemp: 34, minTemp: 26, condition: "Partly Cloudy" },
    { date: "2025-04-14", maxTemp: 31, minTemp: 24, condition: "Cloudy" },
    { date: "2025-04-15", maxTemp: 30, minTemp: 23, condition: "Rain" },
    { date: "2025-04-16", maxTemp: 29, minTemp: 22, condition: "Rain" },
    { date: "2025-04-17", maxTemp: 30, minTemp: 24, condition: "Cloudy" },
    { date: "2025-04-18", maxTemp: 32, minTemp: 25, condition: "Sunny" },
  ]
};

// Sample locations for search
const locations = [
  "Hyderabad, Telangana",
  "Vijayawada, Andhra Pradesh",
  "Warangal, Telangana",
  "Guntur, Andhra Pradesh",
  "Nellore, Andhra Pradesh",
  "Rajahmundry, Andhra Pradesh"
];

// Helper function to get weather icon
const getWeatherIcon = (condition: string, size = 6) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className={`h-${size} w-${size}`} />;
    case 'partly cloudy':
      return <Cloud className={`h-${size} w-${size}`} />;
    case 'cloudy':
      return <Cloud className={`h-${size} w-${size}`} />;
    case 'rain':
      return <CloudRain className={`h-${size} w-${size}`} />;
    case 'snow':
      return <CloudSnow className={`h-${size} w-${size}`} />;
    case 'thunderstorm':
      return <CloudLightning className={`h-${size} w-${size}`} />;
    default:
      return <Sun className={`h-${size} w-${size}`} />;
  }
};

const Weather: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(weatherData.location);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = locations.filter(location =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchQuery(location);
    setShowSearchResults(false);
    // In a real app, this would trigger a weather API call for the new location
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with location search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {t('weather.current')}
        </h1>
        
        <div className="relative">
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <div className="px-3 py-2 bg-gray-50 border-r">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button 
              className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              onClick={() => handleLocationSelect(searchQuery)}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border">
              {searchResults.map((location, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    {location}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Current weather card */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-6">
                {getWeatherIcon(weatherData.current.condition, 16)}
              </div>
              <div>
                <div className="text-5xl font-bold">{weatherData.current.temperature}°C</div>
                <div className="text-xl">{weatherData.current.condition}</div>
                <div className="text-sm opacity-80">Feels like {weatherData.current.feelsLike}°C</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Droplet className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">{t('weather.humidity')}</div>
                <div className="text-xl font-semibold">{weatherData.current.humidity}%</div>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">{t('weather.windSpeed')}</div>
                <div className="text-xl font-semibold">{weatherData.current.windSpeed} km/h</div>
              </div>
              <div className="text-center">
                <CloudRain className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">{t('weather.precipitation')}</div>
                <div className="text-xl font-semibold">{weatherData.current.precipitation}%</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-white/70">
            Last updated: {new Date(weatherData.current.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Forecast section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'today'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('weather.today')} & {t('weather.tomorrow')}
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'week'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('weather.next7Days')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'today' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weatherData.forecast.slice(0, 2).map((day, index) => (
                <div key={day.date} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">
                        {index === 0 ? t('weather.today') : t('weather.tomorrow')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(day.date), 'EEEE, MMMM d')}
                      </p>
                    </div>
                    <div className="text-primary-600">
                      {getWeatherIcon(day.condition, 10)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 text-red-500 mr-1" />
                      <span className="font-medium">{day.maxTemp}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 text-blue-500 mr-1" />
                      <span className="font-medium">{day.minTemp}°C</span>
                    </div>
                    <div>{day.condition}</div>
                  </div>
                  
                  {/* Hourly forecast (simplified for demo) */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Hourly Forecast</h4>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {[9, 12, 15, 18, 21].map((hour) => (
                        <div key={hour} className="text-center">
                          <div className="text-sm">{hour}:00</div>
                          <div className="my-1">{getWeatherIcon(day.condition, 5)}</div>
                          <div className="text-sm font-medium">
                            {Math.round(day.minTemp + (day.maxTemp - day.minTemp) * (hour / 24))}°C
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {weatherData.forecast.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 border-b last:border-0">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {format(new Date(day.date), 'EEEE')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(day.date), 'MMMM d')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div>
                      {getWeatherIcon(day.condition, 6)}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{day.condition}</div>
                      <div>
                        <span className="font-medium">{day.maxTemp}°</span>
                        <span className="text-gray-500 mx-1">/</span>
                        <span className="text-gray-500">{day.minTemp}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Farming recommendations based on weather */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Weather-based Farming Tips
        </h2>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 text-green-800 rounded-md">
            <h3 className="font-medium mb-1">Irrigation Advisory</h3>
            <p className="text-sm">
              With high temperatures expected this week, increase watering frequency for sensitive crops.
            </p>
          </div>
          
          <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
            <h3 className="font-medium mb-1">Heat Protection</h3>
            <p className="text-sm">
              Consider using shade nets for vegetable crops to prevent sun damage.
            </p>
          </div>
          
          <div className="p-3 bg-blue-50 text-blue-800 rounded-md">
            <h3 className="font-medium mb-1">Harvest Advisory</h3>
            <p className="text-sm">
              Rain expected on Thursday and Friday. Plan harvesting operations accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;