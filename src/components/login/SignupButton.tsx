'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const base = `
    flex items-center justify-center
    h-[39px] w-[185px]
    rounded-[10px]

    text-[16px] text-black
    transition-colors duration-200
    cursor-pointer
  `;

  return (
    <button onClick={onClick} className={twMerge(base, className)} {...props}>
      {children}
    </button>
  );
}
