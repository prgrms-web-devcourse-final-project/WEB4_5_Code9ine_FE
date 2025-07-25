import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (data: boolean | undefined) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (data) => set({ isLogin: data }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
