import Analysis from './Analysis';

export default function AuthorizedMain() {
  return (
    <div className="flex gap-[15px]">
      <div className="h-[870px] w-[756px]">
        <Analysis />
      </div>
      <div className="h-[870px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md"></div>
    </div>
  );
}
