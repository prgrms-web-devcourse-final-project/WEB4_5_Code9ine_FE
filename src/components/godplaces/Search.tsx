import CategoryBox from './CategoryBox';
import HotLocation from './HotLocation';
import SearchBox from './SearchBox';

export default function Search() {
  return (
    <div className="m-auto flex max-w-[1920px] flex-col items-center">
      <HotLocation />
      <SearchBox />
      <CategoryBox />
    </div>
  );
}
