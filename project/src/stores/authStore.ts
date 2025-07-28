import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  phoneNumber: string | null;
  sessionId: string | null;
  setPhoneNumber: (phone: string) => void;
  setSessionId: (id: string) => void;
  login: (phoneNumber: string) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (otp: string) => Promise<{ success: boolean; message: string }>;
  register: (phoneNumber: string, name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      phoneNumber: null,
      sessionId: null,

      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setSessionId: (id) => set({ sessionId: id }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (phoneNumber) => {
        try {
          // In a real implementation, this would make an API call to send OTP
          // For demo purposes, we'll simulate it
          set({ phoneNumber });
          
          // Mock successful OTP sending
          set({ sessionId: 'mock-session-id' });
          
          return { success: true, message: 'OTP sent successfully' };
        } catch (error) {
          console.error('Login error:', error);
          return { success: false, message: 'Failed to send OTP' };
        }
      },

      verifyOTP: async (otp) => {
        try {
          // In a real implementation, this would verify the OTP with a backend
          // For demo purposes, we'll accept any OTP
          
          // Mock successful verification (in production, verify OTP with backend)
          // For demo, we'll consider any 4-digit OTP valid
          if (otp.length === 4 && /^\d+$/.test(otp)) {
            // Fetch user from database or create if new
            // This is a mock user for demo
            const mockUser = {
              id: 'user-1',
              phone: get().phoneNumber,
              name: 'Demo Farmer',
              created_at: new Date().toISOString()
            };

            set({ 
              user: mockUser,
              isAuthenticated: true,
              sessionId: null
            });
            
            return { success: true, message: 'OTP verified successfully' };
          }
          
          return { success: false, message: 'Invalid OTP' };
        } catch (error) {
          console.error('OTP verification error:', error);
          return { success: false, message: 'Failed to verify OTP' };
        }
      },

      register: async (phoneNumber, name) => {
        try {
          // In a real implementation, register user in the database
          set({ phoneNumber });
          
          // Mock successful registration
          set({ sessionId: 'mock-session-id' });
          
          return { success: true, message: 'Registration initiated. OTP sent for verification.' };
        } catch (error) {
          console.error('Registration error:', error);
          return { success: false, message: 'Failed to register' };
        }
      },

      logout: async () => {
        // Clear user session
        set({ 
          user: null,
          isAuthenticated: false,
          phoneNumber: null,
          sessionId: null
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);