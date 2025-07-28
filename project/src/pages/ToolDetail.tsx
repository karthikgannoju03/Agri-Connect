import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Calendar, BookOpen, AlertTriangle, Check, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
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
    duration: '12:45',
    uploadDate: '2025-03-15',
    views: 5243,
    longDescription: `
      <p>This comprehensive guide covers everything you need to know about operating a tractor safely and efficiently. Whether you're a beginner or looking to refine your skills, this video provides valuable insights and practical demonstrations.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Pre-operation safety checks</li>
        <li>Basic controls and their functions</li>
        <li>Starting and stopping procedures</li>
        <li>Operating hydraulic systems</li>
        <li>Attaching and using implements</li>
        <li>Maintenance tips to prolong tractor life</li>
      </ul>
      
      <h3>Safety Precautions:</h3>
      <p>Always follow these important safety guidelines:</p>
      <ul>
        <li>Wear appropriate safety gear including hard hat and safety boots</li>
        <li>Never allow passengers unless the tractor has a designated passenger seat</li>
        <li>Keep the ROPS (Rollover Protection Structure) in place</li>
        <li>Always fasten your seatbelt when operating with ROPS</li>
        <li>Be aware of your surroundings, especially slopes and ditches</li>
      </ul>
    `,
    relatedTools: [4, 5, 8],
    safetyLevel: 'high',
    skillLevel: 'beginner-intermediate',
    comments: [
      { id: 1, user: 'Ramesh', text: 'This video helped me a lot when I got my first tractor. Clear instructions!', date: '2025-04-02' },
      { id: 2, user: 'Suresh', text: 'Good explanation of the hydraulics system, which I was struggling with.', date: '2025-03-28' }
    ]
  },
  {
    id: 2,
    name: 'Drip Irrigation Setup',
    description: 'Step-by-step guide to installing and maintaining a drip irrigation system for your crops.',
    category: 'irrigation',
    videoUrl: 'https://www.example.com/videos/drip-irrigation-setup',
    thumbnail: 'https://images.pexels.com/photos/129609/pexels-photo-129609.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '18:30',
    uploadDate: '2025-02-20',
    views: 4187,
    longDescription: `
      <p>Drip irrigation is one of the most efficient ways to water your crops, reducing water usage by up to 60% compared to traditional methods. This video guide walks you through the complete process of setting up a drip irrigation system for your farm or garden.</p>
      
      <h3>Topics Covered:</h3>
      <ul>
        <li>Planning your system based on crop needs and field layout</li>
        <li>Selecting the right components (pipes, emitters, filters, etc.)</li>
        <li>Step-by-step installation process</li>
        <li>Connection to water source and pressure regulators</li>
        <li>Testing and troubleshooting common issues</li>
        <li>Maintenance procedures for long-term performance</li>
      </ul>
      
      <h3>Benefits of Drip Irrigation:</h3>
      <ul>
        <li>Water conservation - delivers water directly to plant roots</li>
        <li>Reduced weed growth - only target areas receive water</li>
        <li>Minimized soil erosion</li>
        <li>Ability to apply fertilizers through the system (fertigation)</li>
        <li>Improved crop yields and quality</li>
      </ul>
    `,
    relatedTools: [6, 7],
    safetyLevel: 'low',
    skillLevel: 'beginner',
    comments: [
      { id: 1, user: 'Lakshmi', text: 'I saved so much water after implementing this system! Thank you for the clear instructions.', date: '2025-04-05' },
      { id: 2, user: 'Arvind', text: 'The maintenance tips were especially helpful for me.', date: '2025-03-12' }
    ]
  },
];

// Sample related tools function
const getRelatedTools = (toolId: number) => {
  const tool = toolsData.find(t => t.id === toolId);
  if (!tool || !tool.relatedTools) return [];
  
  return toolsData.filter(t => tool.relatedTools.includes(t.id));
};

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [tool, setTool] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedTools, setRelatedTools] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      if (id) {
        const foundTool = toolsData.find(t => t.id === parseInt(id, 10));
        setTool(foundTool || null);
        
        if (foundTool) {
          setRelatedTools(getRelatedTools(foundTool.id));
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

  if (!tool) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg mb-4">Tool video not found</p>
        <Link to="/tools" className="btn-primary">
          Back to Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link to="/tools" className="inline-flex items-center text-primary-600 hover:text-primary-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Tools</span>
        </Link>
      </div>

      {/* Video player */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-900">
          <img 
            src={tool.thumbnail} 
            alt={tool.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 transition-transform transform hover:scale-110">
              <Play className="h-8 w-8" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {tool.name}
          </h1>
          
          <div className="flex flex-wrap text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Uploaded: {new Date(tool.uploadDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Duration: {tool.duration}</span>
            </div>
            <div className="flex items-center mb-2">
              <span>{tool.views.toLocaleString()} views</span>
            </div>
          </div>
          
          {/* Safety level indicator */}
          <div className="mb-6">
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-2 ${
                tool.safetyLevel === 'high' ? 'text-red-500' : 
                tool.safetyLevel === 'medium' ? 'text-yellow-500' : 
                'text-green-500'
              }`} />
              <span className="font-medium text-gray-700">
                Safety Level: 
                <span className={`ml-1 ${
                  tool.safetyLevel === 'high' ? 'text-red-600' : 
                  tool.safetyLevel === 'medium' ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {tool.safetyLevel === 'high' ? 'High Risk - Extra Caution Required' : 
                   tool.safetyLevel === 'medium' ? 'Medium Risk - Standard Precautions' : 
                   'Low Risk - Basic Precautions'}
                </span>
              </span>
            </div>
          </div>
          
          {/* Long description */}
          <div 
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: tool.longDescription }}
          />
          
          {/* Interaction buttons */}
          <div className="flex border-t border-b py-3 mb-6">
            <button className="flex items-center mr-4">
              <ThumbsUp className="h-5 w-5 mr-1 text-gray-500" />
              <span>Helpful</span>
            </button>
            <button className="flex items-center mr-4">
              <ThumbsDown className="h-5 w-5 mr-1 text-gray-500" />
              <span>Not Helpful</span>
            </button>
            <button className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-1 text-gray-500" />
              <span>Comment</span>
            </button>
          </div>
          
          {/* Comments section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comments ({tool.comments.length})</h3>
            
            {tool.comments.map((comment: any) => (
              <div key={comment.id} className="border-b last:border-0 py-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relatedTool) => (
              <Link key={relatedTool.id} to={`/tools/${relatedTool.id}`} className="card-hover">
                <div className="relative">
                  <img 
                    src={relatedTool.thumbnail} 
                    alt={relatedTool.name} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                    {relatedTool.duration}
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 mt-2 line-clamp-2">
                  {relatedTool.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolDetail;