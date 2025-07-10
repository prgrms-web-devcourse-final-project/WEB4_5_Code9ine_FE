export default function CategoryItem({
  type,
  classType,
}: {
  type: string;
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'h-[37px] w-[66px] text-[16px] leading-[37px]',
    afterSearch: 'h-[37px] w-[66px] text-[16px] leading-[37px]',
  };
  return (
    <div
      className={`cursor-pointer rounded-[20px] border border-[var(--gray-color-1)] bg-[var(--white-color)] text-center hover:scale-105 hover:bg-[var(--main-color-2)] ${divSizeVariants[classType]}`}
    >
      {type}
    </div>
  );
}
