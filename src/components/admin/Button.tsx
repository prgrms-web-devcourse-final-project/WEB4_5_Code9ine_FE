import { PropsWithChildren } from 'react';

type Button = {
  onClick: () => void;
};

export default function Button({
  onClick,
  children,
}: PropsWithChildren<Button>) {
  return (
    <>
      <button
        type="button"
        className="cursor-pointer rounded-[20px] bg-[var(--point-color-1)] px-[10px] text-[#2b2e34]"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
