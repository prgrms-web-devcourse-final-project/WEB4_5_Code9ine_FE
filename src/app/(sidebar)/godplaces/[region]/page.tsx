
export default async function page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  console.log(region);
  return <></>;
}
