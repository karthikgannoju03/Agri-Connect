import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = 
    toast.type === 'success' ? 'bg-green-100 border-green-500' :
    toast.type === 'error' ? 'bg-red-100 border-red-500' :
    'bg-blue-100 border-blue-500';

  const textColor = 
    toast.type === 'success' ? 'text-green-800' :
    toast.type === 'error' ? 'text-red-800' :
    'text-blue-800';

  const Icon = 
    toast.type === 'success' ? CheckCircle :
    toast.type === 'error' ? AlertCircle :
    Info;

  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-md flex items-center gap-2 min-w-64 max-w-96 animate-fade-in border-l-4 ${bgColor}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${textColor}`} />
      <p className={`text-sm flex-1 ${textColor}`}>{toast.message}</p>
      <button 
        onClick={onClose}
        className={`p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-500 ${textColor}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Toaster: React.FC = () => {
  return (
    <ToastProvider>
      {/* This component just initializes the toast context */}
    </ToastProvider>
  );
};