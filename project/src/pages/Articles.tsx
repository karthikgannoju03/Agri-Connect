import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample articles data (in a real app, this would come from an API)
const articlesData = [
  {
    id: 1,
    title: 'Water Conservation Techniques for Summer',
    excerpt: 'Learn how to save water during hot summer months with these proven techniques for efficient irrigation and soil moisture retention.',
    content: 'Full article content would go here...',
    category: 'irrigation',
    author: 'Dr. Ravi Kumar',
    date: '2025-04-10',
    readTime: 5,
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'Organic Pest Control for Your Crops',
    excerpt: 'Natural ways to keep pests away from your farm without using harmful chemicals that can damage soil health and beneficial insects.',
    content: 'Full article content would go here...',
    category: 'pest-control',
    author: 'Meena Reddy',
    date: '2025-04-08',
    readTime: 8,
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Best Practices for Rice Cultivation',
    excerpt: 'Maximize your rice yield with these proven cultivation techniques from land preparation to harvesting and post-harvest handling.',
    content: 'Full article content would go here...',
    category: 'crops',
    author: 'Suresh Patel',
    date: '2025-04-05',
    readTime: 10,
    image: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    title: 'Soil Health Management for Sustainable Farming',
    excerpt: 'Learn how to maintain and improve soil health through crop rotation, cover crops, and proper nutrient management for long-term sustainability.',
    content: 'Full article content would go here...',
    category: 'soil',
    author: 'Dr. Anjali Singh',
    date: '2025-04-02',
    readTime: 7,
    image: 'https://images.pexels.com/photos/5560441/pexels-photo-5560441.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    title: 'Weather-Smart Farming: Adapting to Climate Change',
    excerpt: 'How farmers can adapt to changing climate patterns with weather-smart agricultural practices to reduce risks and maintain productivity.',
    content: 'Full article content would go here...',
    category: 'climate',
    author: 'Vijay Narayan',
    date: '2025-03-28',
    readTime: 6,
    image: 'https://images.pexels.com/photos/760206/pexels-photo-760206.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'Modern Drip Irrigation Systems: A Complete Guide',
    excerpt: 'Everything you need to know about setting up and maintaining efficient drip irrigation systems for various crop types and soil conditions.',
    content: 'Full article content would go here...',
    category: 'irrigation',
    author: 'Lakshmi Venkat',
    date: '2025-03-25',
    readTime: 9,
    image: 'https://images.pexels.com/photos/129609/pexels-photo-129609.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'crops', name: 'Crop Cultivation' },
  { id: 'irrigation', name: 'Irrigation' },
  { id: 'pest-control', name: 'Pest Control' },
  { id: 'soil', name: 'Soil Management' },
  { id: 'climate', name: 'Climate & Weather' },
];

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter articles based on search term and category
    let results = articlesData;
    
    if (searchTerm) {
      results = results.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(results);
  }, [searchTerm, selectedCategory]);

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
          {t('nav.articles')}
        </h1>
        <p className="text-gray-600 mt-1">
          Stay updated with the latest farming news and techniques
        </p>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Category filter */}
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`} className="card card-hover">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">No articles found matching your search criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles;