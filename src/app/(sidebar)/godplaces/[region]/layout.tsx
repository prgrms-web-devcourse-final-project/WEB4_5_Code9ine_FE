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
      <div className="flex gap-[15px]">
        {search}
        {clicked ? detail : results}
      </div>
    </>
  );
}
