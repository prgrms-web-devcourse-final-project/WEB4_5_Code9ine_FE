import { CalendarList, DataList, DummyData } from '@/types/payData';
import { create } from 'zustand';
import Dummy from '../data/dummy.json';
import DummyCalendar from '../data/dummyCalendar.json';

interface dummyState {
  dummyData: DataList;
  setDummy: (data: DataList | undefined) => void;
  dummyCalendar: CalendarList;
  setCalendar: (data: CalendarList | undefined) => void;
  dummyData2: DummyData[];
  setDummy2: (data: DummyData[] | undefined) => void;
}

export const useDummyData = create<dummyState>((set) => ({
  dummyData: Dummy.data,
  setDummy: (data) => set({ dummyData: data }),
  dummyCalendar: DummyCalendar.data,
  setCalendar: (data) => set({ dummyCalendar: data }),
  dummyData2: Dummy.data.dummy,
  setDummy2: (data) => set({ dummyData2: data }),
}));
