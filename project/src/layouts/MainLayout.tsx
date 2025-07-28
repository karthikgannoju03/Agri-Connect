import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Cloud, LineChart, Sprout, BookOpen, ScanLine, PenTool as Tool, Lightbulb, User, LogOut, ChevronDown, Moon, Sun, Globe } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useTranslation } from 'react-i18next';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'te' : 'en');
  };

  const navItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: Home },
    { name: t('nav.weather'), path: '/weather', icon: Cloud },
    { name: t('nav.marketPrices'), path: '/market-prices', icon: LineChart },
    { name: t('nav.cropAdvisor'), path: '/crop-advisor', icon: Sprout },
    { name: t('nav.articles'), path: '/articles', icon: BookOpen },
    { name: t('nav.scanner'), path: '/scanner', icon: ScanLine },
    { name: t('nav.tools'), path: '/tools', icon: Tool },
    { name: t('nav.tips'), path: '/tips', icon: Lightbulb },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Mobile header */}
      <header className={`lg:hidden flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100">
            <Globe className="h-5 w-5" />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className={`fixed inset-y-0 left-0 flex flex-col w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-primary-600">AgriConnect</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                {t('nav.profile')}
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 mt-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                {t('nav.logout')}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r">
        <div className={`flex flex-col flex-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-primary-600">AgriConnect</h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : `hover:bg-gray-100 ${darkMode ? 'text-gray-300 hover:text-white' : ''}`
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : `hover:bg-gray-100 ${darkMode ? 'text-gray-300 hover:text-white' : ''}`
                  }`
                }
              >
                <User className="h-5 w-5 mr-3" />
                {t('nav.profile')}
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 mt-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                {t('nav.logout')}
              </button>
            </div>
          </nav>
          <div className="p-4 border-t flex justify-between">
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100">
              <Globe className="h-5 w-5" />
              <span className="ml-2 text-sm">{i18n.language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className={`lg:pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;