import { PayList } from '@/types/payData';
import { create } from 'zustand';
import Dummy from '../data/dummy.json';

interface dummyState {
  dummyData: PayList[];
  setDummy: (data: PayList[] | undefined) => void;
}

export const useDummyData = create<dummyState>((set) => ({
  dummyData: Dummy.dummy,
  setDummy: (data) => set({ dummyData: data }),
}));
