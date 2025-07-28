import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import { useAuthStore } from './stores/authStore';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyOTP from './pages/auth/VerifyOTP';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import MarketPrices from './pages/MarketPrices';
import CropAdvisor from './pages/CropAdvisor';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Scanner from './pages/Scanner';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Tips from './pages/Tips';
import Profile from './pages/Profile';

// Layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/verify-otp" element={!isAuthenticated ? <VerifyOTP /> : <Navigate to="/dashboard" />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/weather" element={isAuthenticated ? <Weather /> : <Navigate to="/login" />} />
          <Route path="/market-prices" element={isAuthenticated ? <MarketPrices /> : <Navigate to="/login" />} />
          <Route path="/crop-advisor" element={isAuthenticated ? <CropAdvisor /> : <Navigate to="/login" />} />
          <Route path="/articles" element={isAuthenticated ? <Articles /> : <Navigate to="/login" />} />
          <Route path="/articles/:id" element={isAuthenticated ? <ArticleDetail /> : <Navigate to="/login" />} />
          <Route path="/scanner" element={isAuthenticated ? <Scanner /> : <Navigate to="/login" />} />
          <Route path="/tools" element={isAuthenticated ? <Tools /> : <Navigate to="/login" />} />
          <Route path="/tools/:id" element={isAuthenticated ? <ToolDetail /> : <Navigate to="/login" />} />
          <Route path="/tips" element={isAuthenticated ? <Tips /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Route>
        
        {/* Redirect to login or dashboard based on authentication status */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
}

export default App;