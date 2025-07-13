export default function layout({
  search,
  results,
}: {
  search: React.ReactNode;
  results: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-[15px] flex flex-1 flex-col gap-[15px] md:mt-[0px] md:flex-row mx-[15px]">
        {search}
        {results}
      </div>
    </>
  );
}
