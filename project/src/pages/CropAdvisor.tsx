import React, { useState } from 'react';
import { Sprout, BarChart2, Droplets, ThermometerSun, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample soil types
const soilTypes = [
  { id: 'clay', name: 'Clay' },
  { id: 'sandy', name: 'Sandy' },
  { id: 'loamy', name: 'Loamy' },
  { id: 'silty', name: 'Silty' },
  { id: 'peaty', name: 'Peaty' },
  { id: 'chalky', name: 'Chalky' },
];

// Sample climate types
const climateTypes = [
  { id: 'tropical', name: 'Tropical' },
  { id: 'dry', name: 'Dry' },
  { id: 'temperate', name: 'Temperate' },
  { id: 'continental', name: 'Continental' },
];

// Sample water availability options
const waterOptions = [
  { id: 'abundant', name: 'Abundant' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'limited', name: 'Limited' },
  { id: 'scarce', name: 'Scarce' },
];

// Sample months
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample crop recommendations (in a real app, this would be dynamically generated based on inputs)
const sampleRecommendations = [
  {
    id: 1,
    name: 'Rice',
    suitability: 'High',
    soilTypes: ['clay', 'loamy'],
    waterNeeds: 'High',
    startMonth: 'June',
    endMonth: 'November',
    description: 'Rice is a staple food crop that grows well in waterlogged conditions. It requires warm temperatures and high humidity.',
    tips: [
      'Maintain standing water in the field during the growing period',
      'Apply fertilizer in three splits: at planting, tillering, and heading stages',
      'Control weeds during the early growth stages'
    ]
  },
  {
    id: 2,
    name: 'Cotton',
    suitability: 'Medium',
    soilTypes: ['loamy', 'sandy'],
    waterNeeds: 'Moderate',
    startMonth: 'April',
    endMonth: 'November',
    description: 'Cotton is a commercial crop that thrives in warm weather. It has a deep root system that can access water from deeper soil layers.',
    tips: [
      'Ensure proper spacing between plants (75-100 cm)',
      'Monitor for bollworms and apply appropriate pest management',
      'Harvest when 60% of bolls are open'
    ]
  },
  {
    id: 3,
    name: 'Wheat',
    suitability: 'High',
    soilTypes: ['loamy', 'clay'],
    waterNeeds: 'Moderate',
    startMonth: 'October',
    endMonth: 'April',
    description: 'Wheat is a cool-season crop that grows well in temperatures between 15-24°C. It requires well-drained soils with good water retention capacity.',
    tips: [
      'Sow seeds at a depth of 5-6 cm',
      'Apply irrigation at critical growth stages: crown root initiation, tillering, and grain filling',
      'Harvest when grains are hard and cannot be dented with thumbnail'
    ]
  },
  {
    id: 4,
    name: 'Chickpea',
    suitability: 'Medium',
    soilTypes: ['sandy', 'loamy'],
    waterNeeds: 'Low',
    startMonth: 'October',
    endMonth: 'March',
    description: 'Chickpea is a drought-tolerant legume crop that can fix atmospheric nitrogen. It grows well in cool, dry conditions.',
    tips: [
      'Avoid excessive irrigation as it can lead to vegetative growth',
      'Apply phosphorus fertilizer before sowing',
      'Harvest when plants turn yellowish and pods are dry'
    ]
  },
];

const CropAdvisor: React.FC = () => {
  const { t } = useTranslation();
  const [soil, setSoil] = useState<string>('');
  const [climate, setClimate] = useState<string>('');
  const [waterAvailability, setWaterAvailability] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to get personalized recommendations
    // For this demo, we'll use the sample recommendations
    setRecommendations(sampleRecommendations);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setSoil('');
    setClimate('');
    setWaterAvailability('');
    setStartMonth('');
    setEndMonth('');
    setIsSubmitted(false);
    setRecommendations([]);
    setSelectedCrop(null);
  };

  const viewCropDetails = (crop: any) => {
    setSelectedCrop(crop);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('cropAdvisor.recommendCrop')}
        </h1>
        <p className="text-gray-600 mt-1">
          Get personalized crop recommendations based on your farming conditions
        </p>
      </div>

      {/* Input form */}
      {!isSubmitted && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Soil type */}
              <div>
                <label htmlFor="soil" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('cropAdvisor.soilType')}
                </label>
                <select
                  id="soil"
                  value={soil}
                  onChange={(e) => setSoil(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Climate */}
              <div>
                <label htmlFor="climate" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('cropAdvisor.climate')}
                </label>
                <select
                  id="climate"
                  value={climate}
                  onChange={(e) => setClimate(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select climate type</option>
                  {climateTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Water availability */}
              <div>
                <label htmlFor="water" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('cropAdvisor.waterAvailability')}
                </label>
                <select
                  id="water"
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select water availability</option>
                  {waterOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Season (start and end months) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startMonth" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('cropAdvisor.startMonth')}
                  </label>
                  <select
                    id="startMonth"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="endMonth" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('cropAdvisor.endMonth')}
                  </label>
                  <select
                    id="endMonth"
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="btn-primary">
                Get Recommendations
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Results */}
      {isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommendations list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {t('cropAdvisor.results')}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  New Search
                </button>
              </div>
              
              <div className="space-y-3">
                {recommendations.map((crop) => (
                  <div 
                    key={crop.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCrop?.id === crop.id 
                        ? 'border-primary-600 bg-primary-50' 
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => viewCropDetails(crop)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Sprout className={`h-5 w-5 mr-2 ${
                          selectedCrop?.id === crop.id ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <h3 className="font-medium text-gray-900">{crop.name}</h3>
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
                    <div className="mt-2 text-sm text-gray-600">
                      {crop.startMonth} - {crop.endMonth}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Crop details */}
          <div className="lg:col-span-2">
            {selectedCrop ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCrop.name}
                  </h2>
                  <div className="flex items-center mt-2">
                    <div className={`text-sm font-medium px-2 py-1 rounded-full mr-2 ${
                      selectedCrop.suitability === 'High'
                        ? 'bg-green-100 text-green-800'
                        : selectedCrop.suitability === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedCrop.suitability} Suitability
                    </div>
                    <div className="text-sm text-gray-600">
                      Season: {selectedCrop.startMonth} to {selectedCrop.endMonth}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700">{selectedCrop.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <BarChart2 className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-medium">Soil Preference</h3>
                    </div>
                    <div className="text-sm">
                      {selectedCrop.soilTypes.map((soilId: string) => (
                        soilTypes.find(s => s.id === soilId)?.name
                      )).join(', ')}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Droplets className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-medium">Water Needs</h3>
                    </div>
                    <div className="text-sm">{selectedCrop.waterNeeds}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <ThermometerSun className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-medium">Growing Period</h3>
                    </div>
                    <div className="text-sm">{selectedCrop.startMonth} - {selectedCrop.endMonth}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Farming Tips</h3>
                  <ul className="space-y-2">
                    {selectedCrop.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full">
                <InfoIcon className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  Select a crop from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAdvisor;