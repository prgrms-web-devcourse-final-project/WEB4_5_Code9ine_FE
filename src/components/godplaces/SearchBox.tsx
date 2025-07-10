import { CiSearch } from 'react-icons/ci';

export default function SearchBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'h-[65px] md:w-[850px] gap-[20px] mb-[43px]',
    afterSearch: 'h-[65px] md:w-[756px] gap-[20px] mb-[10px]',
  };

  const iconSizeVariants = {
    beforeSearch: 'size-[30px]',
    afterSearch: 'size-[30px]',
  };

  const inputSizeVariants = {
    beforeSearch: 'md:h-[51px] md:w-[500px] md:text-[20px]',
    afterSearch: 'md:h-[51px] md:w-[500px] md:text-[20px]',
  };

  const inputColorVariants = {
    beforeSearch: 'text-[var(--gray-color-2)]',
    afterSearch: 'text-[var(--text-color-white)]',
  };

  return (
    <div
      className={`flex items-center rounded-[15px] bg-[var(--white-color)] px-[24px] shadow-md ${divSizeVariants[classType]}`}
    >
      <CiSearch
        className={`-scale-x-100 fill-[var(--gray-color-2)] stroke-[var(--gray-color-2)] stroke-[0.5px] ${iconSizeVariants[classType]}`}
      />
      <input
        type="text"
        placeholder="Ex. 성동구"
        className={`focus:outline-none ${inputSizeVariants[classType]} ${inputColorVariants[classType]}`}
        // value="성동구"
      />
    </div>
  );
}
