export default function TotalAmount() {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <span>7월 9일까지의 총수입은 </span>
        <span className="text-[var(--main-color-3)]">300,000</span>
        <span>원이에요</span>
      </div>
      <div>
        <span>7월 9일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">30,000</span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
