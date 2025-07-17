'use client';
import Search from '@/components/godplaces/search/Search';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { useEffect } from 'react';

export default function GodPlaces() {
  const reset = useGodplacesStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, []);
  return (
    <>
      <Search />
    </>
  );
}
