'use client';
import Image from 'next/image';
import logo from '@/assets/Logo.svg';
import Button from '../login/SignupButton';
import { LuNotebook } from 'react-icons/lu';
import {
  IoLogoGithub,
  IoPersonCircleOutline,
  IoSearchSharp,
} from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { useState } from 'react';
import { FiMoon } from 'react-icons/fi';
import { IoMdNotificationsOutline, IoMdPower } from 'react-icons/io';
import MobileMenu from '../common/MobileMenu';

export default function ColoredBox({
  changeLogin,
}: {
  changeLogin: (arg0: boolean) => void;
}) {
  const [login, setLogin] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const handleLogin = () => {
    setLogin(!login);
    changeLogin(!login);
  };
  return (
    <div className="relative">
      <div className="relative flex w-full items-center justify-center bg-[var(--header-color)] p-[10px] md:h-[870px] md:w-[200px] md:flex-col md:rounded-[10px]">
        {/* 다크 모드 버튼: 오른쪽 위 */}
        <div className="hidden cursor-pointer gap-[12px] text-[var(--header-text)] md:flex md:self-end">
          <FiMoon size={12} />
          {login ? <IoMdNotificationsOutline size={12} /> : null}
        </div>

        {/* 로고 및 네비게이션: 가운데 정렬 */}
        <div className="flex items-center justify-center space-x-[28vw] md:mt-6 md:flex-col md:gap-3 md:space-x-0">
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setMenu(!menu)}
          >
            <div
              className={`${'mb-1 h-[1px] w-[20px] rounded-full bg-[#ffffff] transition-all duration-300'} ${menu ? 'translate-y-[5px] rotate-45' : ''}`}
            ></div>
            <div
              className={`${'mb-1 h-[1px] w-[20px] rounded-full bg-[#ffffff] transition-all duration-300'} ${menu ? 'opacity-0' : 'opacity-100'}`}
            ></div>
            <div
              className={`${'mb-1 h-[1px] w-[20px] rounded-full bg-[#ffffff] transition-all duration-300'} ${menu ? '-translate-y-[5px] -rotate-45' : ''}`}
            ></div>
          </button>
          <div className="mt-[5px] mb-[6px] flex h-[29px] w-[87px] cursor-pointer items-center justify-center gap-[13px] md:h-[29px] md:w-[87px]">
            <Image src={logo} alt="티태 로고" />
            <span className="text-[#ffffff]">티태</span>
          </div>

          {!login ? (
            <div className="hidden md:block">
              <Button className="pc-header-button">
                <LuNotebook size={20} />
                가계부
              </Button>

              <Button className="pc-header-button">
                <IoSearchSharp size={20} />
                갓플찾기
              </Button>

              <Button className="pc-header-button">
                <HiOutlineUserGroup size={20} />
                커뮤니티
              </Button>

              <Button className="pc-header-button" onClick={handleLogin}>
                <BsPersonRaisedHand size={20} />
                로그인/회원가입
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button className="pc-header-button">
                <LuNotebook size={20} />
                가계부
              </Button>

              <Button className="pc-header-button">
                <IoSearchSharp size={20} />
                갓플찾기
              </Button>

              <Button className="pc-header-button">
                <HiOutlineUserGroup size={20} />
                커뮤니티
              </Button>

              <Button className="pc-header-button">
                <IoPersonCircleOutline size={20} />
                마이페이지
              </Button>

              <Button className="pc-header-button" onClick={handleLogin}>
                <IoMdPower size={20} />
                로그아웃
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <IoMdNotificationsOutline />
          </div>
        </div>
        <div className="mt-auto hidden flex-col items-center gap-2 md:flex">
          <p className="cursor-pointer self-end text-[14px] text-[var(--header-text)]">
            1:1 문의하기
          </p>
          <div className="flex items-end justify-center gap-1 pb-[10px] text-[var(--main-color-2)]">
            <IoLogoGithub size={22} />
            <p className="text-[10px]">© Code9ine All Right Reserved</p>
          </div>
        </div>
      </div>

      <div
        className={`absolute z-900 -translate-x-full transition-all duration-300 ${menu ? 'translate-x-0' : ''} md:hidden`}
      >
        <MobileMenu />
      </div>
    </div>
  );
}
