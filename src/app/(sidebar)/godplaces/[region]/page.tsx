import CategoryBox from '@/components/godplaces/CategoryBox';
import SearchBox from '@/components/godplaces/SearchBox';

export default async function page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  console.log(region);
  return (
    <>
      <SearchBox classType="afterSearch" />
      <CategoryBox classType="afterSearch" />
    </>
  );
}
