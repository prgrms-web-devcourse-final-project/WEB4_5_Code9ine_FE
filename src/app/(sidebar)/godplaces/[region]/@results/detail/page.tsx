import DetailBox from '@/components/godplaces/detail/DetailBox';

export default function page() {
  return (
    <div className="mb-[15px] flex min-h-[270px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[870px] md:w-[350px]">
      <div>
        <DetailBox />
      </div>
    </div>
  );
}
