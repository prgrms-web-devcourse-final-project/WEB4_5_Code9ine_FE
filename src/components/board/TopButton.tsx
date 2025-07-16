'use client';
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

interface TopButtonProps {
  scrollTargetId: string;
}

export default function TopButton({ scrollTargetId }: TopButtonProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = scrollTargetId
      ? document.getElementById(scrollTargetId)
      : window;

    const handleScroll = () => {
      const scrollTop = scrollTargetId
        ? (target as HTMLElement).scrollTop
        : window.scrollY;

      setShow(scrollTop > 300);
    };

    target?.addEventListener('scroll', handleScroll);
    return () => target?.removeEventListener('scroll', handleScroll);
  }, [scrollTargetId]);

  const scrollToTop = () => {
    const target = scrollTargetId
      ? document.getElementById(scrollTargetId)
      : window;

    if (scrollTargetId && target) {
      (target as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="sticky bottom-1 mx-auto flex aspect-square w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--main-color-3)] text-white hover:bg-[var(--main-color-2)] md:w-[50px]"
    >
      <IoIosArrowUp className="h-[25px] w-[25px] md:h-[35px] md:w-[35px]" />
    </button>
  );
}
