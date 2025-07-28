import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PenTool as ToolIcon, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample tools data (in a real app, this would come from an API)
const toolsData = [
  {
    id: 1,
    name: 'Tractor Operation',
    description: 'Learn how to operate a tractor safely and efficiently for various farming tasks.',
    category: 'machinery',
    videoUrl: 'https://www.example.com/videos/tractor-operation',
    thumbnail: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:45'
  },
  {
    id: 2,
    name: 'Drip Irrigation Setup',
    description: 'Step-by-step guide to installing and maintaining a drip irrigation system for your crops.',
    category: 'irrigation',
    videoUrl: 'https://www.example.com/videos/drip-irrigation-setup',
    thumbnail: 'https://images.pexels.com/photos/129609/pexels-photo-129609.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '18:30'
  },
  {
    id: 3,
    name: 'Pruning Techniques',
    description: 'Master the art of pruning fruit trees and plants to increase yields and plant health.',
    category: 'hand-tools',
    videoUrl: 'https://www.example.com/videos/pruning-techniques',
    thumbnail: 'https://images.pexels.com/photos/6120215/pexels-photo-6120215.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '09:15'
  },
  {
    id: 4,
    name: 'Sprayer Calibration',
    description: 'Learn how to properly calibrate sprayers for efficient and effective application of pesticides and fertilizers.',
    category: 'machinery',
    videoUrl: 'https://www.example.com/videos/sprayer-calibration',
    thumbnail: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15:20'
  },
  {
    id: 5,
    name: 'Harvesting Equipment',
    description: 'Overview of different harvesting equipment and how to use them for various crops.',
    category: 'machinery',
    videoUrl: 'https://www.example.com/videos/harvesting-equipment',
    thumbnail: 'https://images.pexels.com/photos/259771/pexels-photo-259771.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '21:10'
  },
  {
    id: 6,
    name: 'Soil Testing Tools',
    description: 'Guide to using soil testing kits and interpreting the results for better crop management.',
    category: 'testing',
    videoUrl: 'https://www.example.com/videos/soil-testing-tools',
    thumbnail: 'https://images.pexels.com/photos/5486771/pexels-photo-5486771.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '11:45'
  },
  {
    id: 7,
    name: 'Greenhouse Setup',
    description: 'Complete guide to setting up a small-scale greenhouse for extending your growing season.',
    category: 'structures',
    videoUrl: 'https://www.example.com/videos/greenhouse-setup',
    thumbnail: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '25:30'
  },
  {
    id: 8,
    name: 'Seed Drill Operation',
    description: 'How to operate a seed drill for precise and efficient planting of various crops.',
    category: 'machinery',
    videoUrl: 'https://www.example.com/videos/seed-drill-operation',
    thumbnail: 'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '14:15'
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'machinery', name: 'Machinery' },
  { id: 'hand-tools', name: 'Hand Tools' },
  { id: 'irrigation', name: 'Irrigation' },
  { id: 'testing', name: 'Testing Equipment' },
  { id: 'structures', name: 'Structures' },
];

const Tools: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(toolsData);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter tools based on search term and category
    let results = toolsData;
    
    if (searchTerm) {
      results = results.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(tool => tool.category === selectedCategory);
    }
    
    setFilteredTools(results);
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
          {t('nav.tools')}
        </h1>
        <p className="text-gray-600 mt-1">
          Watch instructional videos on how to use various farming tools and equipment
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
              placeholder="Search tools and equipment..."
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

      {/* Tools grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.id} to={`/tools/${tool.id}`} className="card card-hover">
              <div className="relative">
                <img 
                  src={tool.thumbnail} 
                  alt={tool.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                  <PlayCircle className="h-3 w-3 mr-1" />
                  {tool.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start">
                  <ToolIcon className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {tool.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {categories.find(c => c.id === tool.category)?.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">No tools found matching your search criteria</p>
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

export default Tools;