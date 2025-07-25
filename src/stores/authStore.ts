// src/stores/authStore.ts
import { create } from 'zustand';
import { logout as apiLogout } from '@/services/authService';

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
  logout: async () => {
    try {
      // services/authService.ts 에 정의된 logout() 호출
      const { message } = await apiLogout();
      console.log('로그아웃 완료:', message);
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
    // API 호출 결과와 관계없이 상태는 false 로
    set({ isLoggedIn: false });
  },
}));
