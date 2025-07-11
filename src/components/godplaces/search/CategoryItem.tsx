export default function CategoryItem({
  type,
  classType,
}: {
  type: string;
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
    afterSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
  };
  return (
    <div
      className={`cursor-pointer rounded-[20px] border border-[var(--gray-color-1)] bg-[var(--white-color)] text-center hover:scale-105 hover:border-none hover:bg-[var(--main-color-2)] dark:border-none dark:shadow-[var(--shadow-md)] ${divSizeVariants[classType]}`}
    >
      {type}
    </div>
  );
}
