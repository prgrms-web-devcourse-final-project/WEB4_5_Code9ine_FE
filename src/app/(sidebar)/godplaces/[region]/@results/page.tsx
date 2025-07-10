import SearchListBox from '@/components/godplaces/SearchListBox';

export default function ResultsPage() {
  return (
    <div className="flex h-[870px] w-[350px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-md">
      <div>
        <SearchListBox />
      </div>
    </div>
  );
}
