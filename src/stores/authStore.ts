import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (data: boolean | undefined) => void;
  isAdmin: boolean;
  setIsAdmin: (data: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (data) => set({ isLogin: data }),
      isAdmin: false,
      setIsAdmin: (data) => set({ isAdmin: data }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
