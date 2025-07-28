import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample tips data (in a real app, this would come from an API)
const tipsData = [
  {
    id: 1,
    title: 'Conserve Water with Mulching',
    content: 'Apply a layer of organic mulch around your plants to reduce water evaporation, suppress weeds, and improve soil health. Use materials like straw, dried leaves, or compost.',
    category: 'water-conservation',
    isFeatured: true
  },
  {
    id: 2,
    title: 'Natural Pest Control with Neem Oil',
    content: 'Neem oil is an effective organic pesticide. Mix 1-2 tablespoons in a liter of water with a drop of dish soap and spray on affected plants. It controls aphids, mealybugs, and many other pests.',
    category: 'pest-management',
    isFeatured: true
  },
  {
    id: 3,
    title: 'Crop Rotation for Soil Health',
    content: 'Rotate your crops each season to prevent soil nutrient depletion and reduce pest and disease buildup. Group crops by families and avoid planting the same family in the same location for at least 3 years.',
    category: 'soil-management',
    isFeatured: false
  },
  {
    id: 4,
    title: 'Companion Planting Benefits',
    content: 'Plant marigolds alongside vegetables to repel harmful nematodes. Grow basil near tomatoes to improve their flavor and repel pests. Onions planted with carrots help deter carrot flies.',
    category: 'planting-techniques',
    isFeatured: false
  },
  {
    id: 5,
    title: 'Harvest at the Right Time',
    content: 'Harvest vegetables in the early morning when temperatures are cool to maintain freshness and nutrient content. For fruits, harvest when they\'re fully ripe but before they become overripe.',
    category: 'harvesting',
    isFeatured: false
  },
  {
    id: 6,
    title: 'Save Seeds from Your Best Plants',
    content: 'Select seeds from your healthiest, most productive plants to improve your crop quality over time. Dry them thoroughly and store in a cool, dark place in paper envelopes or glass jars.',
    category: 'seed-saving',
    isFeatured: false
  },
  {
    id: 7,
    title: 'Testing Soil pH at Home',
    content: `Create a simple soil pH test using vinegar and baking soda. If soil fizzes with vinegar, it's alkaline. If it fizzes with baking soda and water, it's acidic. No reaction to either means it's neutral.`,
    category: 'soil-management',
    isFeatured: true
  },
  {
    id: 8,
    title: 'Natural Calcium Boost for Plants',
    content: 'Crush eggshells and mix them into your soil or compost to add calcium. This helps prevent blossom end rot in tomatoes and strengthens plant cell walls.',
    category: 'fertilization',
    isFeatured: false
  },
  {
    id: 9,
    title: 'Banana Peels for Potassium',
    content: 'Bury banana peels near the base of your plants to add potassium to the soil as they decompose. Particularly beneficial for flowering and fruiting plants.',
    category: 'fertilization',
    isFeatured: false
  },
  {
    id: 10,
    title: 'Protect Seedlings with Plastic Bottles',
    content: 'Cut the bottom off plastic bottles and place them over young seedlings to create mini-greenhouses that protect from pests and cold temperatures.',
    category: 'plant-protection',
    isFeatured: false
  },
  {
    id: 11,
    title: 'Intercropping to Maximize Space',
    content: 'Plant fast-growing crops like radishes between slower-growing ones like cabbage to utilize space efficiently. The radishes will be harvested before the cabbage needs the room.',
    category: 'planting-techniques',
    isFeatured: false
  },
  {
    id: 12,
    title: 'Early Morning Watering',
    content: 'Water plants early in the morning to reduce evaporation loss and allow foliage to dry before evening, which helps prevent fungal diseases.',
    category: 'water-conservation',
    isFeatured: false
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Tips' },
  { id: 'water-conservation', name: 'Water Conservation' },
  { id: 'pest-management', name: 'Pest Management' },
  { id: 'soil-management', name: 'Soil Management' },
  { id: 'planting-techniques', name: 'Planting Techniques' },
  { id: 'harvesting', name: 'Harvesting' },
  { id: 'seed-saving', name: 'Seed Saving' },
  { id: 'fertilization', name: 'Fertilization' },
  { id: 'plant-protection', name: 'Plant Protection' },
];

const TipCard: React.FC<{ tip: any; isBookmarked: boolean; toggleBookmark: (id: number) => void }> = ({ tip, isBookmarked, toggleBookmark }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${expanded ? 'ring-2 ring-primary-300' : ''}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-1">
            <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
            <h3 className="font-medium text-gray-800">{tip.title}</h3>
          </div>
          <div className="flex items-center ml-2">
            <button 
              onClick={() => toggleBookmark(tip.id)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-primary-600" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="p-1 ml-1 rounded-full hover:bg-gray-100"
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        <div className={`mt-2 text-gray-600 ${expanded ? 'block' : 'line-clamp-2'}`}>
          {tip.content}
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t text-sm">
            <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1">
              {categories.find(c => c.id === tip.category)?.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Tips: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedTips, setBookmarkedTips] = useState<number[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [filteredTips, setFilteredTips] = useState(tipsData);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter tips based on search term, category, and bookmarked status
    let results = tipsData;
    
    if (searchTerm) {
      results = results.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(tip => tip.category === selectedCategory);
    }
    
    if (showBookmarkedOnly) {
      results = results.filter(tip => bookmarkedTips.includes(tip.id));
    }
    
    setFilteredTips(results);
  }, [searchTerm, selectedCategory, bookmarkedTips, showBookmarkedOnly]);

  const toggleBookmark = (id: number) => {
    setBookmarkedTips(prev => 
      prev.includes(id) 
        ? prev.filter(tipId => tipId !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Get featured tips
  const featuredTips = tipsData.filter(tip => tip.isFeatured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('nav.tips')}
        </h1>
        <p className="text-gray-600 mt-1">
          Helpful tips to keep your crops healthy and maximize yields
        </p>
      </div>

      {/* Featured tips */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Featured Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredTips.map((tip) => (
            <div key={tip.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{tip.content}</p>
            </div>
          ))}
        </div>
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
              placeholder="Search tips..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            {/* Bookmarked filter */}
            <button
              onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              className={`flex items-center px-4 py-2 rounded-md border ${
                showBookmarkedOnly 
                  ? 'bg-primary-50 border-primary-300 text-primary-700' 
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              <BookmarkCheck className="h-5 w-5 mr-2" />
              Bookmarked
            </button>
          </div>
        </div>
      </div>

      {/* Tips grid */}
      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => (
            <TipCard 
              key={tip.id} 
              tip={tip} 
              isBookmarked={bookmarkedTips.includes(tip.id)}
              toggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">No tips found matching your criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setShowBookmarkedOnly(false);
            }}
            className="btn-primary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Tips;