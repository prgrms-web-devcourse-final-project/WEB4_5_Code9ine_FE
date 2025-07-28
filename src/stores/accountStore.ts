import { PayList, totalData } from '@/types/payData';
import { GetMyPageData } from '@/types/userType';
import { create } from 'zustand';

interface accountState {
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
  calcString: string | null;
  setCalcString: (data: string | null) => void;
  userData: GetMyPageData | null;
  setUserData: (data: GetMyPageData | null) => void;
  rewriteData: PayList | null;
  setRewriteData: (data: PayList | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (data: boolean) => void;
  mobileAiOpen: boolean;
  setMobileAiOpen: (data: boolean) => void;
}

export const useAccountData = create<accountState>((set) => ({
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
  calcString: null,
  setCalcString: (data) => set({ calcString: data }),
  userData: null,
  setUserData: (data) => set({ userData: data }),
  rewriteData: null,
  setRewriteData: (data) => set({ rewriteData: data }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (data) => set({ mobileMenuOpen: data }),
  mobileAiOpen: false,
  setMobileAiOpen: (data) => set({ mobileAiOpen: data }),
}));
