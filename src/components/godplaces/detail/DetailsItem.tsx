export default function DetailsItem({
  title,
  price,
}: {
  title: string;
  price: string;
}) {
  return (
    <div className="flex h-auto items-center justify-between gap-[15px] text-[14px] md:text-[16px]">
      <div className="w-[150px] md:w-[115px]">{title}</div>
      <hr className="w-[140px] border-dashed md:w-[65px]" />
      <div className="w-[110px] text-right md:w-[100px]">
        {parseInt(price, 10).toLocaleString()}원
      </div>
    </div>
  );
}
