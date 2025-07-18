import CategoryBox from '@/components/godplaces/search/CategoryBox';
import MapBox from '@/components/godplaces/map/MapBox';
import SearchBox from '@/components/godplaces/search/SearchBox';

export default function page() {
  return (
    <div className="flex flex-col justify-center gap-[15px] md:mx-[0px] md:mt-[0px]">
      <div className="flex flex-col gap-[5px] md:mb-[9px] md:gap-[0px]">
        <SearchBox classType="afterSearch" />
        <CategoryBox classType="afterSearch" />
      </div>
      <MapBox />
    </div>
  );
}
