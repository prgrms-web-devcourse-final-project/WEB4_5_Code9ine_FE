'use client';
import CategoryBox from './CategoryBox';
import HotLocation from '../HotLocation';
import SearchBox from './SearchBox';
import { useRouter } from 'next/navigation';
import { useGodplacesStore } from '@/stores/godplacesStore';

const TYPE = 'beforeSearch';

export default function Search() {
  const router = useRouter();
  const location = useGodplacesStore((state) => state.location);
  const category = useGodplacesStore((state) => state.category);

  const formSubmit = () => {
    router.push(`/godplaces/${location}?${Array.from(category).join(',')}`);
  };

  console.log(category);

  return (
    <div className="mt-[260px] flex min-w-[360px] flex-col items-center">
      <HotLocation />

      <form action={formSubmit}>
        <SearchBox classType={TYPE} />
        <CategoryBox classType={TYPE} />
      </form>
    </div>
  );
}
