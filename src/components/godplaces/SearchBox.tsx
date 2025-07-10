import { CiSearch } from 'react-icons/ci';

export default function SearchBox({
  classType,
}: {
  classType: 'beforeSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'h-[65px] gap-[60px] md:w-[850px]',
  };

  const iconSizeVariants = {
    beforeSearch: 'size-[30px]',
  };

  const inputSizeVariants = {
    beforeSearch: 'md:h-[51px] md:w-[500px] md:text-[20px]',
  };

  return (
    <div
      className={`mb-[43px] flex items-center justify-center rounded-[15px] px-[100px] shadow-md ${divSizeVariants[classType]}`}
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
