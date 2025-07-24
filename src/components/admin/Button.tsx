import { PropsWithChildren } from 'react';

type Button = {
  onClick: () => void;
  className: string;
};

export default function Button({
  onClick,
  children,
  className,
}: PropsWithChildren<Button>) {
  return (
    <>
      <button
        type="button"
        className={`cursor-pointer rounded-[20px] px-[10px] text-[#2b2e34] ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
