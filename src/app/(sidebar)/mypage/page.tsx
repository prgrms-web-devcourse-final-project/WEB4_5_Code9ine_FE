export default function page() {
  return (
    <>
      <div className="flex gap-[15px]">
        <div className="h-[870px] w-[756px] rounded-[10px] bg-[var(--white-color)] shadow-md">
          <h1>My Page</h1>
        </div>
        <div className="flex flex-col gap-[21px]">
          <div className="h-[390px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md"></div>
          <div className="h-[460px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md"></div>
        </div>
      </div>
    </>
  );
}
