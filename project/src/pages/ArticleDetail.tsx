import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample articles data (in a real app, this would come from an API)
const articlesData = [
  {
    id: 1,
    title: 'Water Conservation Techniques for Summer',
    excerpt: 'Learn how to save water during hot summer months with these proven techniques for efficient irrigation and soil moisture retention.',
    content: `
      <h2>Introduction to Water Conservation</h2>
      <p>Water is a precious resource, especially for farmers during the summer months. With rising temperatures and increased evaporation rates, implementing effective water conservation techniques is crucial for sustainable agriculture.</p>
      
      <h2>Drip Irrigation Systems</h2>
      <p>Drip irrigation is one of the most efficient watering methods, delivering water directly to the plant's root zone. This technique can reduce water usage by up to 60% compared to conventional flood irrigation methods.</p>
      <p>Key benefits of drip irrigation:</p>
      <ul>
        <li>Precise water application directly to plant roots</li>
        <li>Minimal water loss through evaporation</li>
        <li>Reduced weed growth in non-irrigated areas</li>
        <li>Lower energy costs for pumping water</li>
        <li>Ability to apply fertilizers through the system (fertigation)</li>
      </ul>
      
      <h2>Mulching for Moisture Retention</h2>
      <p>Applying a layer of mulch around your crops helps retain soil moisture by reducing evaporation and suppressing weeds that compete for water. Organic mulches like straw, dried leaves, or compost not only conserve water but also improve soil health as they decompose.</p>
      
      <h2>Rainwater Harvesting</h2>
      <p>Capturing and storing rainwater during monsoon seasons provides a valuable water source during dry periods. Simple systems like farm ponds, tanks, or even barrel collectors can make a significant difference in water availability.</p>
      
      <h2>Soil Moisture Monitoring</h2>
      <p>Using soil moisture sensors or simple manual checks helps determine when irrigation is actually needed, preventing both under-watering and over-watering. This targeted approach ensures water is applied only when necessary.</p>
      
      <h2>Drought-Resistant Crop Varieties</h2>
      <p>Consider planting crop varieties that are naturally adapted to lower water conditions. Many traditional and improved varieties have been developed specifically for water-scarce environments.</p>
      
      <h2>Conclusion</h2>
      <p>By implementing these water conservation techniques, farmers can significantly reduce water usage while maintaining or even improving crop yields. Start with one or two methods that best suit your farm conditions and gradually incorporate others for maximum benefit.</p>
    `,
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
    content: `
      <h2>The Benefits of Organic Pest Control</h2>
      <p>Conventional chemical pesticides can harm beneficial insects, contaminate soil and water, and potentially affect human health. Organic pest control methods offer effective alternatives that work with natural systems rather than against them.</p>
      
      <h2>Companion Planting</h2>
      <p>Certain plants naturally repel specific pests when planted alongside your crops. For example, marigolds deter nematodes, while basil can repel flies and mosquitoes. Strategic companion planting creates a natural barrier against common pests.</p>
      <p>Effective companion planting combinations:</p>
      <ul>
        <li>Tomatoes with basil (repels flies and mosquitoes)</li>
        <li>Carrots with onions (repels carrot flies)</li>
        <li>Cabbage with thyme (deters cabbage worms)</li>
        <li>Cotton with marigold (controls nematodes)</li>
      </ul>
      
      <h2>Beneficial Insects</h2>
      <p>Encouraging beneficial predatory insects like ladybugs, praying mantises, and lacewings helps control pest populations naturally. These helpful insects prey on common crop pests such as aphids, mites, and caterpillars.</p>
      
      <h2>Neem Oil Applications</h2>
      <p>Derived from the neem tree, this natural insecticide disrupts the life cycle of many pests without harming beneficial insects when used correctly. It's effective against aphids, mealybugs, and various types of mites.</p>
      
      <h2>Homemade Organic Sprays</h2>
      <p>Simple sprays made from ingredients like garlic, hot peppers, or soap can deter or eliminate many common pests. These solutions are cost-effective and can be prepared with locally available materials.</p>
      <p>Basic garlic-chili spray recipe:</p>
      <ol>
        <li>Crush 5-6 garlic cloves and 2-3 hot chilies</li>
        <li>Soak in 1 liter of water overnight</li>
        <li>Strain the mixture and add 1 tablespoon of liquid soap</li>
        <li>Dilute with 5 liters of water before spraying on plants</li>
      </ol>
      
      <h2>Crop Rotation</h2>
      <p>Changing the location of crops each season disrupts pest life cycles by removing their preferred host plants. This simple practice can significantly reduce pest pressure over time.</p>
      
      <h2>Conclusion</h2>
      <p>Organic pest control is not just about replacing chemical pesticides with natural alternatives. It's a holistic approach that focuses on building a resilient, balanced ecosystem where pest populations are naturally kept in check. While it may require more planning and observation than chemical methods, the long-term benefits for your soil, beneficial insects, and overall farm health make it well worth the effort.</p>
    `,
    category: 'pest-control',
    author: 'Meena Reddy',
    date: '2025-04-08',
    readTime: 8,
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

// Related articles (simplified for demo)
const getRelatedArticles = (currentId: number) => {
  return articlesData.filter(article => article.id !== currentId).slice(0, 3);
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      if (id) {
        const foundArticle = articlesData.find(a => a.id === parseInt(id, 10));
        setArticle(foundArticle || null);
        
        if (foundArticle) {
          setRelatedArticles(getRelatedArticles(foundArticle.id));
        }
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg mb-4">Article not found</p>
        <Link to="/articles" className="btn-primary">
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link to="/articles" className="inline-flex items-center text-primary-600 hover:text-primary-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Share options */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Share this article:</span>
              <div className="flex space-x-3">
                <button className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link key={relatedArticle.id} to={`/articles/${relatedArticle.id}`} className="card-hover">
                <img 
                  src={relatedArticle.image} 
                  alt={relatedArticle.title} 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="font-medium text-gray-800 mt-3 mb-1 line-clamp-2">
                  {relatedArticle.title}
                </h3>
                <div className="text-xs text-gray-500">
                  {new Date(relatedArticle.date).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;