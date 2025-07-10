export default async function page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  return (
    <>
      <div className="flex gap-[15px]">
        <div className="h-[870px] w-[756px] rounded-[10px] bg-[var(--white-color)] shadow-md">
          <h1>{region}</h1>
        </div>
        <div className="flex h-[870px] w-[350px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-md"></div>
      </div>
    </>
  );
}
