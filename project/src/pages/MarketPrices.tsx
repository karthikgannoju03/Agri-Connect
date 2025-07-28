import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data (in a real app, this would come from an API)
const marketsData = [
  { id: 1, name: 'Central Market', distance: 3.2 },
  { id: 2, name: 'Farmers Market', distance: 5.8 },
  { id: 3, name: 'Rural Exchange', distance: 8.1 },
];

const productsData = [
  { id: 1, name: 'Tomatoes', category: 'vegetable', price: 45, lastWeek: 40, trend: 'up', market: 'Central Market', unit: 'kg' },
  { id: 2, name: 'Potatoes', category: 'vegetable', price: 30, lastWeek: 32, trend: 'down', market: 'Central Market', unit: 'kg' },
  { id: 3, name: 'Onions', category: 'vegetable', price: 25, lastWeek: 22, trend: 'up', market: 'Central Market', unit: 'kg' },
  { id: 4, name: 'Rice', category: 'grain', price: 65, lastWeek: 65, trend: 'stable', market: 'Rural Exchange', unit: 'kg' },
  { id: 5, name: 'Wheat', category: 'grain', price: 40, lastWeek: 38, trend: 'up', market: 'Rural Exchange', unit: 'kg' },
  { id: 6, name: 'Mangoes', category: 'fruit', price: 120, lastWeek: 100, trend: 'up', market: 'Farmers Market', unit: 'kg' },
  { id: 7, name: 'Apples', category: 'fruit', price: 180, lastWeek: 190, trend: 'down', market: 'Farmers Market', unit: 'kg' },
  { id: 8, name: 'Cabbage', category: 'vegetable', price: 35, lastWeek: 30, trend: 'up', market: 'Central Market', unit: 'kg' },
];

// Sample price history data for a chart
const priceHistoryData = [
  { month: 'Jan', tomatoes: 35, potatoes: 28, onions: 20 },
  { month: 'Feb', tomatoes: 38, potatoes: 25, onions: 22 },
  { month: 'Mar', tomatoes: 40, potatoes: 30, onions: 24 },
  { month: 'Apr', tomatoes: 45, potatoes: 30, onions: 25 },
  { month: 'May', tomatoes: 48, potatoes: 32, onions: 28 },
  { month: 'Jun', tomatoes: 52, potatoes: 35, onions: 30 },
];

const MarketPrices: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'trend'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
      setSelectedMarket(1); // Default to first market
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = productsData
    .filter((product) => {
      if (selectedMarket && product.market !== marketsData.find(m => m.id === selectedMarket)?.name) {
        return false;
      }
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      } else {
        // Sort by trend
        const trendOrder = { up: 2, stable: 1, down: 0 };
        return sortOrder === 'asc' 
          ? trendOrder[a.trend as keyof typeof trendOrder] - trendOrder[b.trend as keyof typeof trendOrder]
          : trendOrder[b.trend as keyof typeof trendOrder] - trendOrder[a.trend as keyof typeof trendOrder];
      }
    });

  const handleSort = (field: 'name' | 'price' | 'trend') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('marketPrices.nearbyMarkets')}
        </h1>
        <p className="text-gray-600 mt-1">
          View current prices and trends at markets near you
        </p>
      </div>

      {/* Markets selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Select a Market
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketsData.map((market) => (
            <button
              key={market.id}
              onClick={() => setSelectedMarket(market.id)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedMarket === market.id 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center">
                <MapPin className={`h-5 w-5 mr-2 ${
                  selectedMarket === market.id ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">{market.name}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {market.distance} km away
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price list */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {t('marketPrices.vegetablePrices')}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search box */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Category filter */}
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="vegetable">Vegetables</option>
                <option value="fruit">Fruits</option>
                <option value="grain">Grains</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>{t('marketPrices.product')}</span>
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    <span>{t('marketPrices.price')} (₹)</span>
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('marketPrices.unit')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('trend')}
                >
                  <div className="flex items-center">
                    <span>Trend</span>
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      per {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.trend === 'up' ? (
                          <>
                            <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
                            <span className="text-sm text-green-600">
                              +{Math.abs(product.price - product.lastWeek)}
                            </span>
                          </>
                        ) : product.trend === 'down' ? (
                          <>
                            <TrendingDown className="h-5 w-5 text-red-600 mr-1" />
                            <span className="text-sm text-red-600">
                              -{Math.abs(product.price - product.lastWeek)}
                            </span>
                          </>
                        ) : (
                          <>
                            <Minus className="h-5 w-5 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">Stable</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price trends chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t('marketPrices.priceHistory')}
        </h2>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={priceHistoryData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="tomatoes" stroke="#f44336" fill="#ffcdd2" name="Tomatoes" />
              <Area type="monotone" dataKey="potatoes" stroke="#ff9800" fill="#ffe0b2" name="Potatoes" />
              <Area type="monotone" dataKey="onions" stroke="#9c27b0" fill="#e1bee7" name="Onions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Price trends over the last 6 months (₹ per kg)
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;