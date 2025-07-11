export default function DetailsItem({
  title,
  price,
}: {
  title: string;
  price: string;
}) {
  return (
    <div className="flex h-[20px] items-center justify-between text-[16px]">
      <div>{title}</div>
      <hr className="w-[100px] border-dashed" />
      <div className="w-[70px] text-right">
        {parseInt(price, 10).toLocaleString()}원
      </div>
    </div>
  );
}
