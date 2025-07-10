import CategoryBox from '@/components/godplaces/CategoryBox';
import EstimationBox from '@/components/godplaces/EstimationBox';
import MapBox from '@/components/godplaces/MapBox';
import SearchBox from '@/components/godplaces/SearchBox';

export default function page() {
  return (
    <div className="h-[870px] w-[756px] rounded-[10px]">
      <div className="flex flex-col gap-[24px]">
        <div>
          <SearchBox classType="afterSearch" />
          <CategoryBox classType="afterSearch" />
        </div>
        <MapBox />
        <EstimationBox />
      </div>
    </div>
  );
}
