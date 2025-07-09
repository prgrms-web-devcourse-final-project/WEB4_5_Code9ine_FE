'use client';
import { twMerge } from 'tailwind-merge';

export default function Icon({
  width,
  height,
  left,
  top,
  className,
  onClick,
}: {
  width: string;
  height: string;
  left: string;
  top: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundPosition: `${left} ${top}`,
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url('/icon.png')`, // public/icon.png
      }}
      className={twMerge(className)}
      onClick={onClick}
    />
  );
}
