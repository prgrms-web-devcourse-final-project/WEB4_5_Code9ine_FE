export default function layout({
  search,
  results,
}: {
  search: React.ReactNode;
  results: React.ReactNode;
}) {
  return (
    <>
      <div className="gap-[15px] md:flex">
        {search}
        {results}
      </div>
    </>
  );
}
