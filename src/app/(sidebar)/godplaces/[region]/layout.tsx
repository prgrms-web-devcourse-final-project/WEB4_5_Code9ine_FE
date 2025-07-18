import EstimationContainer from '@/components/godplaces/EstimationContainer';

export default function layout({
  search,
  results,
}: {
  search: React.ReactNode;
  results: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-[15px] flex flex-1 flex-col gap-[15px] md:mt-[0px] md:flex-row">
        <div className="flex min-w-[330px] flex-col gap-[15px] rounded-[10px] md:h-[870px] md:w-[756px]">
          {search}
          <EstimationContainer />
        </div>
        {results}
      </div>
    </>
  );
}
