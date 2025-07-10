import CategoryBox from '@/components/godplaces/CategoryBox';
import EstimationBox from '@/components/godplaces/EstimationBox';
import MapBox from '@/components/godplaces/MapBox';
import SearchBox from '@/components/godplaces/SearchBox';
import SearchListBox from '@/components/godplaces/SearchListBox';

export default async function page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  console.log(region);
  return (
    <>
      <div className="flex gap-[15px]">
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
        <div className="flex h-[870px] w-[350px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-md">
          <div>
            <SearchListBox />
          </div>
        </div>
      </div>
    </>
  );
}
