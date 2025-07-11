'use client';
import Image from 'next/image';
import logo from '@/assets/mainpage/logo.png';
// import darkmodBtn from '@/assets/mainpage/darkmodebtn.png';
import Button from '../login/SignupButton';
import account from '@/assets/mainpage/account.png';
import godplaceicon from '@/assets/mainpage/godplaceicon.png';
import community from '@/assets/mainpage/community.png';
import login from '@/assets/mainpage/login.png';
import mypage from '@/assets/coloredBox/mypage.png';
import logout from '@/assets/coloredBox/logout.png';
import alarm from '@/assets/coloredBox/alarm.png';
import selectaccount from '@/assets/mainpage/selectaccount.png';
import selectgodplaceicon from '@/assets/mainpage/selectgodplace.png';
import selectcommunity from '@/assets/mainpage/selectcommunity.png';
import selectlogin from '@/assets/mainpage/selectlogin.png';
import github from '@/assets/coloredBox/github.png';
import selectmypage from '@/assets/coloredBox/selectmypage.png';
import selectlogout from '@/assets/coloredBox/selectlogout.png';
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

export default function ColoredBox() {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="relative rounded-[10px] bg-[var(--header-color)] p-[10px] md:flex md:h-[870px] md:w-[200px] md:flex-col md:items-center">
      {/* 다크 모드 버튼: 오른쪽 위 */}
      <div className="flex cursor-pointer gap-[12px] text-[var(--header-text)] md:self-end">
        <FiMoon size={12} />
        {login ? <IoMdNotificationsOutline size={12} /> : null}
      </div>

      {/* 로고 및 네비게이션: 가운데 정렬 */}
      <div className="md:mt-6 md:flex md:flex-col md:items-center md:gap-3">
        <div className="mb-[10px] cursor-pointer">
          <Image src={logo} alt="티태 로고" width={87} height={34} />
        </div>

        {!login ? (
          <div>
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

            <Button className="pc-header-button" onClick={() => setLogin(true)}>
              <BsPersonRaisedHand size={20} />
              로그인/회원가입
            </Button>
          </div>
        ) : (
          <div>
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

            <Button
              className="pc-header-button"
              onClick={() => setLogin(false)}
            >
              <IoMdPower size={20} />
              로그아웃
            </Button>
          </div>
        )}
      </div>
      <div className="mt-auto flex flex-col items-center gap-2">
        <p className="cursor-pointer self-end text-[14px] text-[var(--header-text)]">
          1:1 문의하기
        </p>
        <div className="flex items-end justify-center gap-1 pb-[10px] text-[var(--main-color-2)]">
          <IoLogoGithub size={22} />
          <p className="text-[10px]">© Code9ine All Right Reserved</p>
        </div>
      </div>
    </div>
  );
}
