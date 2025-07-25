import { GodplacesSearchList, MyBookmark, Plans } from '@/types/godplaces';
import { create } from 'zustand';

type GodplacesStore = {
  location: string;
  setLocation: (newLocation: string) => void;
  category: Set<string>;
  setCategory: (type: string) => void;
  reset: () => void;
  godplaces: GodplacesSearchList[] | undefined;
  setGodplaces: (data: GodplacesSearchList[]) => void;
  bookmarked: MyBookmark[];
  setBookmarked: (data: MyBookmark[]) => void;
  toggleBookmarked: (data: MyBookmark) => void;
  plans: Plans[];
  setPlans: (data: Plans) => void;
};

export const useGodplacesStore = create<GodplacesStore>((set) => ({
  location: '',
  setLocation: (newLocation) => set({ location: newLocation }),
  category: new Set(),
  setCategory: (type) =>
    set((state) => {
      const newSet = new Set(state.category);
      if (newSet.has(type)) newSet.delete(type);
      else newSet.add(type);
      return { category: newSet };
    }),
  reset: () =>
    set({ location: '', category: new Set(), godplaces: undefined, plans: [] }),
  godplaces: undefined,
  setGodplaces: (data) => set({ godplaces: data }),
  bookmarked: [],
  setBookmarked: (data) => set({ bookmarked: data }),
  toggleBookmarked: (data) =>
    set((state) => {
      const key = `${data.type}Id` as keyof MyBookmark;
      const isBookmarked = state.bookmarked.some(
        (b) => b.type === data.type && b[key] === data[key],
      );

      return {
        bookmarked: isBookmarked
          ? state.bookmarked.filter(
              (b) => !(b.type === data.type && b[key] === data[key]),
            )
          : [...state.bookmarked, data],
      };
    }),
  plans: [],
  setPlans: (data) =>
    set((state) => {
      const exists = state.plans.some(
        (plan) => plan.type === data.type && plan.id === data.id,
      );

      if (exists) {
        return {
          plans: state.plans.filter(
            (plan) => !(plan.type === data.type && plan.id === data.id),
          ),
        };
      } else {
        return {
          plans: [...state.plans, data],
        };
      }
    }),
}));
