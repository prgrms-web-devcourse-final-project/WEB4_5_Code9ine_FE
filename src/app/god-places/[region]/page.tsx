export default async function page({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return (
    <>
      <h1>{region}</h1>
    </>
  );
}
