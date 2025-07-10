import { PropsWithChildren } from 'react';

type ButtonProps = {
  color: 'gray' | 'purple' | 'skyblue';
};

export default function DetailButton({
  color,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center gap-[5px] rounded-[10px] border px-[8px] py-[11px] text-[14px] md:h-[40px] ${color === 'gray' && 'w-[144px] border-[var(--gray-color-2)] hover:bg-[var(--gray-color-2)]'} ${color === 'purple' && 'w-[40px] border-[var(--main-color-2)] hover:bg-[var(--main-color-2)]'} ${color === 'skyblue' && 'w-[99px] border-[var(--main-color-1)] hover:bg-[var(--main-color-1)] dark:bg-[#91a6cb]'}`}
    >
      {children}
    </div>
  );
}
