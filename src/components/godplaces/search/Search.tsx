import CategoryBox from './CategoryBox';
import HotLocation from '../HotLocation';
import SearchBox from './SearchBox';

const TYPE = 'beforeSearch';

export default function Search() {
  return (
    <div className="mt-[260px] flex flex-col items-center">
      <HotLocation />
      <SearchBox classType={TYPE} />
      <CategoryBox classType={TYPE} />
    </div>
  );
}
