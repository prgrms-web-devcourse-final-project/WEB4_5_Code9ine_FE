import SearchListBox from '@/components/godplaces/search/SearchListBox';

export default function ResultsPage() {
  return (
    <div className="mx-[15px] mt-[15px] flex h-[270px] w-[330px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:mx-[0px] md:mt-0 md:h-[870px] md:w-[350px]">
      <div>
        <SearchListBox />
      </div>
    </div>
  );
}
