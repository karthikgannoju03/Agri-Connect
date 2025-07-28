import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Cloud, CloudRain, Droplet, Wind, Sprout, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore';

// Sample data (in a real app, this would come from APIs)
const weatherData = {
  temperature: 28,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 12,
  precipitation: 0,
};

const marketData = [
  { id: 1, name: 'Tomatoes', price: 45, trend: 'up', change: 5 },
  { id: 2, name: 'Potatoes', price: 30, trend: 'down', change: 2 },
  { id: 3, name: 'Onions', price: 25, trend: 'up', change: 3 },
];

const recommendedCrops = [
  { id: 1, name: 'Rice', suitability: 'High', season: 'Monsoon' },
  { id: 2, name: 'Cotton', suitability: 'Medium', season: 'Summer' },
  { id: 3, name: 'Wheat', suitability: 'High', season: 'Winter' },
];

const articles = [
  { 
    id: 1, 
    title: 'Water Conservation Techniques for Summer',
    excerpt: 'Learn how to save water during hot summer months...',
    date: '2025-04-10',
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 2, 
    title: 'Organic Pest Control for Your Crops',
    excerpt: 'Natural ways to keep pests away from your farm...',
    date: '2025-04-08',
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('dashboard.welcome')}, {user?.name || 'Farmer'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's your farming overview for today.
        </p>
      </div>

      {/* Weather summary */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('dashboard.weatherSummary')}</h2>
          <Link to="/weather" className="text-white hover:underline flex items-center">
            <span className="text-sm">Details</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {weatherData.condition === 'Sunny' ? (
              <Sun className="h-12 w-12 mr-4" />
            ) : weatherData.condition === 'Cloudy' ? (
              <Cloud className="h-12 w-12 mr-4" />
            ) : (
              <CloudRain className="h-12 w-12 mr-4" />
            )}
            <div>
              <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
              <div>{weatherData.condition}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Droplet className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">{t('weather.humidity')}</div>
              <div className="font-semibold">{weatherData.humidity}%</div>
            </div>
            <div className="text-center">
              <Wind className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">{t('weather.windSpeed')}</div>
              <div className="font-semibold">{weatherData.windSpeed} km/h</div>
            </div>
            <div className="text-center">
              <CloudRain className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">{t('weather.precipitation')}</div>
              <div className="font-semibold">{weatherData.precipitation}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.marketTrends')}</h2>
          <Link to="/market-prices" className="text-primary-600 hover:underline flex items-center">
            <span className="text-sm">{t('dashboard.viewAll')}</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('marketPrices.product')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('marketPrices.price')} (₹/kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center ${
                      item.trend === 'up' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {item.trend === 'up' ? '+' : '-'}{item.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two column layout for smaller sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended crops */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.recommendedCrops')}</h2>
            <Link to="/crop-advisor" className="text-primary-600 hover:underline flex items-center">
              <span className="text-sm">{t('dashboard.viewAll')}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recommendedCrops.map((crop) => (
              <div key={crop.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Sprout className="h-6 w-6 text-primary-600 mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{crop.name}</h3>
                  <p className="text-sm text-gray-600">{crop.season}</p>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  crop.suitability === 'High'
                    ? 'bg-green-100 text-green-800'
                    : crop.suitability === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {crop.suitability}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest articles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.latestArticles')}</h2>
            <Link to="/articles" className="text-primary-600 hover:underline flex items-center">
              <span className="text-sm">{t('dashboard.viewAll')}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="block">
                <div className="flex space-x-3 card-hover">
                  <img src={article.image} alt={article.title} className="w-24 h-20 rounded-md object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 line-clamp-1">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(article.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;