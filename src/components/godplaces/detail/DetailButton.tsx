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
      className={`flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded-[10px] border px-[8px] py-[11px] text-[12px] md:h-[40px] md:text-[14px] ${color === 'gray' && 'w-[135px] border-[var(--gray-color-2)] hover:bg-[var(--gray-color-2)] md:w-[144px]'} ${color === 'purple' && 'w-[35px] border-[var(--main-color-2)] hover:bg-[var(--main-color-2)] md:w-[40px]'} ${color === 'skyblue' && 'w-[92px] border-[var(--main-color-1)] hover:bg-[var(--main-color-1)] md:w-[99px] dark:bg-[#91a6cb]'}`}
    >
      {children}
    </div>
  );
}
