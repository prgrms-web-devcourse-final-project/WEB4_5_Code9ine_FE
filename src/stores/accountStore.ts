import { totalData } from '@/types/payData';
import { create } from 'zustand';

interface dummyState {
  category: string | null;
  setCategory: (data: string | null) => void;
  dateData: Date | null;
  setDateData: (data: Date | null) => void;
  showDayData: boolean;
  setShowDayData: (data: boolean) => void;
  totalData: totalData | null;
  setTotaldata: (data: totalData | null) => void;
}

export const useAccountData = create<dummyState>((set) => ({
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
}));
