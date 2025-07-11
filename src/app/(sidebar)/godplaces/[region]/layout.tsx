export default function layout({
  search,
  results,
  detail,
}: {
  search: React.ReactNode;
  results: React.ReactNode;
  detail: React.ReactNode;
}) {
  const clicked = true;
  return (
    <>
      <div className="gap-[15px] md:flex">
        {search}
        {clicked ? detail : results}
      </div>
    </>
  );
}
