export default function MobileCardMenu({ index }: { index: number }) {
  const handleDelete = () => {
    console.log(index);
  };
  return (
    <>
      <div className="flex h-full w-full flex-col gap-[5px] rounded-[5px] bg-[var(--background)] py-[5px]">
        <button className="cursor-pointer px-[30px]">수정</button>
        <div className="w-full border-1"></div>
        <button className="cursor-pointer px-[30px]" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </>
  );
}
