import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MyTitle } from '@/types/userType';

interface TitleStore {
  equippedTitle: MyTitle | null;
  setEquippedTitle: (title: MyTitle) => void;
  clearEquippedTitle: () => void;
}

export const useTitleStore = create<TitleStore>()(
  persist(
    (set) => ({
      equippedTitle: null,
      setEquippedTitle: (title) => set({ equippedTitle: title }),
      clearEquippedTitle: () => set({ equippedTitle: null }),
    }),
    {
      name: 'title-storage',
    },
  ),
);
