import { CiSearch } from 'react-icons/ci';

export default function SearchBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'h-[65px] gap-[60px] md:w-[850px] mb-[43px]',
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

  return (
    <div
      className={`flex items-center justify-center rounded-[15px] bg-[var(--white-color)] px-[100px] shadow-md ${divSizeVariants[classType]}`}
    >
      <CiSearch className={`-scale-x-100 ${iconSizeVariants[classType]}`} />
      <input
        type="text"
        placeholder="Ex. 성동구"
        className={`text-[var(--gray-color-2)] focus:outline-none ${inputSizeVariants[classType]}`}
      />
    </div>
  );
}
