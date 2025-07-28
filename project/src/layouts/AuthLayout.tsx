import React from 'react';
import { Outlet } from 'react-router-dom';
import { Plane as Plant } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthLayout: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'te' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="bg-primary-600 text-white md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Plant className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AgriConnect</h1>
          <p className="text-xl mb-8">
            Your complete agricultural companion for smart farming and better yields
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Weather Updates</h3>
              <p className="text-sm">Get real-time weather forecasts for your location</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Crop Advisory</h3>
              <p className="text-sm">Expert recommendations for your farming conditions</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Market Prices</h3>
              <p className="text-sm">Stay updated with current vegetable prices nearby</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Farming Resources</h3>
              <p className="text-sm">Access articles, videos and tool guides</p>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white py-2 px-4 rounded-md"
          >
            {i18n.language === 'en' ? 'తెలుగులో చూడండి' : 'View in English'}
          </button>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="bg-gray-50 md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;