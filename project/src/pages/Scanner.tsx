import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, Check, X, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample result data (in a real app, this would come from API analysis)
const sampleResults = [
  {
    type: 'natural',
    confidence: 0.92,
    components: [
      { name: 'Compost', percentage: '45%' },
      { name: 'Vermicompost', percentage: '30%' },
      { name: 'Bone Meal', percentage: '15%' },
      { name: 'Neem Cake', percentage: '10%' }
    ]
  },
  {
    type: 'chemical',
    confidence: 0.85,
    components: [
      { name: 'Urea', percentage: '40%' },
      { name: 'Phosphate', percentage: '30%' },
      { name: 'Potassium', percentage: '20%' },
      { name: 'Other Chemicals', percentage: '10%' }
    ]
  },
  {
    type: 'mixed',
    confidence: 0.78,
    components: [
      { name: 'Organic Matter', percentage: '35%' },
      { name: 'Nitrogen Compounds', percentage: '25%' },
      { name: 'Phosphorus', percentage: '20%' },
      { name: 'Potassium', percentage: '20%' }
    ]
  }
];

const Scanner: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    // In a real app, this would access the device camera
    // For demo purposes, we'll simulate it with file upload
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          handleAnalyze();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API analysis with timeout
    setTimeout(() => {
      // Randomly select a result type for demo
      const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      
      // Add to scan history
      if (image) {
        setScanHistory(prev => [
          {
            id: Date.now(),
            image,
            result: randomResult,
            date: new Date().toISOString()
          },
          ...prev
        ]);
      }
    }, 2000);
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  const getResultBadge = (type: string) => {
    switch (type) {
      case 'natural':
        return (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
            <Check className="h-4 w-4 mr-1" />
            {t('scanner.natural')}
          </div>
        );
      case 'chemical':
        return (
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
            <X className="h-4 w-4 mr-1" />
            {t('scanner.chemical')}
          </div>
        );
      case 'mixed':
        return (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
            <InfoIcon className="h-4 w-4 mr-1" />
            {t('scanner.mixed')}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('scanner.scanFertilizer')}
        </h1>
        <p className="text-gray-600 mt-1">
          Analyze fertilizer to determine if it's natural or chemical-based
        </p>
      </div>

      {/* Scanner */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {!image ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
              <div className="text-center mb-6">
                <p className="text-gray-500 mb-4">
                  Take a photo or upload an image of the fertilizer
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCapture}
                    className="btn-primary flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    {t('scanner.takePhoto')}
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={handleCapture}
                    className="btn-outline flex items-center justify-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    {t('scanner.uploadImage')}
                  </button>
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <h3 className="font-medium text-gray-700 mb-2 text-center">
                  How it works:
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span>Take a clear photo of the fertilizer package or the fertilizer itself</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span>Our system will analyze the image and identify its components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span>You'll get a report showing whether it's natural, chemical, or a mixture</span>
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {isAnalyzing ? t('scanner.analyzing') : t('scanner.results')}
                </h2>
                <button
                  onClick={resetScan}
                  className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  New Scan
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={image} 
                    alt="Fertilizer scan" 
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
                
                <div>
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                      <p className="text-gray-600">Analyzing your fertilizer...</p>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold">
                          Fertilizer Type:
                        </div>
                        {getResultBadge(result.type)}
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Confidence: {Math.round(result.confidence * 100)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              result.type === 'natural' 
                                ? 'bg-green-500' 
                                : result.type === 'chemical'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            }`}
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Composition:</h3>
                        <div className="space-y-3">
                          {result.components.map((component: any, index: number) => (
                            <div key={index} className="flex justify-between items-center">
                              <span>{component.name}</span>
                              <span className="text-gray-600">{component.percentage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <h3 className="font-medium mb-3">Recommendation:</h3>
                        <p className="text-gray-700">
                          {result.type === 'natural' 
                            ? 'This appears to be a natural organic fertilizer, suitable for organic farming practices.'
                            : result.type === 'chemical'
                            ? 'This appears to be a chemical fertilizer. Consider organic alternatives for sustainable farming.'
                            : 'This appears to be a mixed fertilizer with both organic and chemical components.'
                          }
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan history */}
      {scanHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t('scanner.scanHistory')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={scan.image} 
                    alt="Past scan" 
                    className="object-cover w-full h-32"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-500">
                      {new Date(scan.date).toLocaleDateString()}
                    </div>
                    {getResultBadge(scan.result.type)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;