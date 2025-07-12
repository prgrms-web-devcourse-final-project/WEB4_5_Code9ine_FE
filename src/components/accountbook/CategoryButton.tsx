export default function CategoryButton({ category }: { category: string }) {
  return (
    <>
      <button className="h-[40px] w-[80px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-black active:bg-[var(--main-color-2)]">
        {category}
      </button>
    </>
  );
}
