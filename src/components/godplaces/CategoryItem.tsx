export default function CategoryItem({
  type,
  classType,
}: {
  type: string;
  classType: 'beforeSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'h-[37px] w-[66px] text-[16px] leading-[37px]',
  };
  return (
    <div
      className={`cursor-pointer rounded-[20px] text-center shadow-md hover:scale-105 hover:bg-[var(--main-color-2)] hover:shadow-none ${divSizeVariants[classType]}`}
    >
      {type}
    </div>
  );
}
