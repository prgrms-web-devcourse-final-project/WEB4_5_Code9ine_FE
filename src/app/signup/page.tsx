'use client';

import SignupBox from '@/components/signup/signup';
import logo from '@/assets/Logo.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const gradient = `
    radial-gradient(
      circle,
      var(--login-gradient-color-1) 0%,
      var(--login-gradient-color-2) 32%,
      var(--login-gradient-color-3) 70%,
      var(--login-gradient-color-3) 100%
    )
  `;

  return (
    <div
      className="mx-auto flex h-auto w-full flex-col items-center justify-center rounded-[20px] bg-cover bg-center select-none md:h-[880px] md:w-[1366px]"
      style={{ background: gradient }}
    >
      <Link href={'/'}>
        <div className="mb-[20px] flex h-[29px] w-[87px] cursor-pointer items-center justify-center gap-[13px]">
          <Image src={logo} alt="티태 로고" />
          <span className="text-[18px] font-semibold text-[#ffffff]">티태</span>
        </div>
      </Link>

      <SignupBox />
    </div>
  );
}
