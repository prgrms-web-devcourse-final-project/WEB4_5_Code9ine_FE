import { create } from 'zustand';

type GodplacesStore = {
  location: string;
  setLocation: (newLocation: string) => void;
  category: Set<string>;
  setCategory: (type: string) => void;
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
}));
