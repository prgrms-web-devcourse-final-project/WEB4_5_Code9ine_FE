import SearchListBox from '@/components/godplaces/search/SearchListBox';

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ region: string }>;
  searchParams: Promise<{ category: string }>;
}) {
  const { region } = await params;
  const { category } = await searchParams;

  return (
    <div className="mb-[15px] flex min-w-[330px] flex-1 flex-col rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:mx-[0px] md:mt-0 md:mb-[0px] md:h-[870px] md:w-[350px]">
      <SearchListBox region={region} category={category} />
    </div>
  );
}
