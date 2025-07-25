import { totalData } from '@/types/payData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface dummyState {
  isLogin: boolean;
  setIsLogin: (data: boolean | undefined) => void;
  category: string | null;
  setCategory: (data: string | null) => void;
  dateData: Date | null;
  setDateData: (data: Date | null) => void;
  showDayData: boolean;
  setShowDayData: (data: boolean) => void;
  totalData: totalData | null;
  setTotaldata: (data: totalData | null) => void;
  isAccount: string;
  setIsAccount: (data: string) => void;
  insert: boolean;
  setInsert: (data: boolean) => void;
  isId: number | null;
  setIsId: (data: number | null) => void;
}

export const useAccountData = create<dummyState>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (data) => set({ isLogin: data }),
      category: null,
      setCategory: (data) => set({ category: data }),
      dateData: new Date(),
      setDateData: (data) => set({ dateData: data }),
      showDayData: false,
      setShowDayData: (data) => set({ showDayData: data }),
      totalData: null,
      setTotaldata: (data) => set({ totalData: data }),
      isAccount: '추가',
      setIsAccount: (data) => set({ isAccount: data }),
      insert: false,
      setInsert: (data) => set({ insert: data }),
      isId: null,
      setIsId: (data) => set({ isId: data }),
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({
        isLogin: state.isLogin,
      }),
    },
  ),
);
