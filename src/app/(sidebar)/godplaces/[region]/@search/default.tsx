import CategoryBox from '@/components/godplaces/search/CategoryBox';
import EstimationBox from '@/components/godplaces/EstimationBox';
import MapBox from '@/components/godplaces/map/MapBox';
import SearchBox from '@/components/godplaces/search/SearchBox';

export default function page() {
  return (
    <div className="mini-w-[330px] rounded-[10px] md:h-[870px] md:w-[756px]">
      <div className="flex flex-col gap-[15px] md:gap-[24px]">
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
