'use client';
import { twMerge } from 'tailwind-merge';
import sprite from '@/assets/image.png';

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
        backgroundImage: `url(${sprite.src})`,
        backgroundPosition: `${left} ${top}`,
        backgroundRepeat: 'no-repeat',
      }}
      className={twMerge(className)}
      onClick={onClick}
    />
  );
}
