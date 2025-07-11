import { CalendarList, DataList } from '@/types/payData';
import { create } from 'zustand';
import Dummy from '../data/dummy.json';
import DummyCalendar from '../data/dummyCalendar.json';

interface dummyState {
  dummyData: DataList;
  setDummy: (data: DataList | undefined) => void;
  dummyCalendar: CalendarList;
  setCalendar: (data: CalendarList | undefined) => void;
}

export const useDummyData = create<dummyState>((set) => ({
  dummyData: Dummy.data,
  setDummy: (data) => set({ dummyData: data }),
  dummyCalendar: DummyCalendar.data,
  setCalendar: (data) => set({ dummyCalendar: data }),
}));
