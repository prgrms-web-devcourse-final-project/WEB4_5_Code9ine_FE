'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className, ...props }: ButtonProps) {
  const base = `
    flex items-center justify-center
    h-[39px] w-[185px]
    rounded-[10px]
    bg-[var(--green-color-1)]
    text-[16px] font-bold text-black
    transition-colors duration-200
    hover:bg-[var(--green-color-2)]
    active:bg-[var(--green-color-3)]
  `;

  return (
    <button className={twMerge(base, className)} {...props}>
      {children}
    </button>
  );
}
