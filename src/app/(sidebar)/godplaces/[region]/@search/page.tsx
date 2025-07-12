import CategoryBox from '@/components/godplaces/search/CategoryBox';
import EstimationBox from '@/components/godplaces/EstimationBox';
import MapBox from '@/components/godplaces/map/MapBox';
import SearchBox from '@/components/godplaces/search/SearchBox';

export default function page() {
  return (
    <div className="min-w-[330px] rounded-[10px] md:h-[870px] md:w-[756px]">
      <div className="mx-[15px] flex flex-col justify-center gap-[15px] md:mx-[0px] md:mt-[0px] md:gap-[24px]">
        <div className="flex flex-col gap-[5px] md:gap-[0px]">
          <SearchBox classType="afterSearch" />
          <CategoryBox classType="afterSearch" />
        </div>
        <MapBox />
        <EstimationBox />
      </div>
    </div>
  );
}
