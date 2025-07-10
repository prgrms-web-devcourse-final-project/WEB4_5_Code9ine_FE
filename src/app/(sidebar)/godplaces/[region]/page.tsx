import CategoryBox from '@/components/godplaces/CategoryBox';
import EstimationBox from '@/components/godplaces/EstimationBox';
import MapBox from '@/components/godplaces/MapBox';
import SearchBox from '@/components/godplaces/SearchBox';

export default async function page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  console.log(region);
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <SearchBox classType="afterSearch" />
        <CategoryBox classType="afterSearch" />
      </div>
      <MapBox />
      <EstimationBox />
    </div>
  );
}
