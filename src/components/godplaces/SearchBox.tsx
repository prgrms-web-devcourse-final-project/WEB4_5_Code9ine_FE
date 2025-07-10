import { CiSearch } from 'react-icons/ci';

export default function SearchBox() {
  return (
    <div className="mb-[43px] flex h-[65px] items-center justify-center gap-[60px] rounded-[15px] px-[100px] shadow-md md:w-[850px]">
      <CiSearch className="size-[30px] -scale-x-100" />
      <input
        type="text"
        placeholder="Ex. 성동구"
        className="text-[var(--gray-color-2)] focus:outline-none md:h-[51px] md:w-[500px] md:text-[20px]"
      />
    </div>
  );
}
