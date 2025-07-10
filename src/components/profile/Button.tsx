interface ButtonProps {
  title: string;
}
export default function Button({ title }: ButtonProps) {
  return (
    <>
      <button className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-2)]">
        {title}
      </button>
    </>
  );
}
