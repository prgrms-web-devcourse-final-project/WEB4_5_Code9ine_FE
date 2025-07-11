'use client';
import Image from 'next/image';
import logo from '@/assets/mainpage/logo.png';
import darkmodBtn from '@/assets/mainpage/darkmodebtn.png';
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

export default function ColoredBox() {
  return (
    <div className="relative flex h-[870px] w-[200px] flex-col items-center rounded-[10px] bg-[var(--header-color)] p-[10px]">
      {/* 다크 모드 버튼: 오른쪽 위 */}
      <div className="cursor-pointer self-end">
        <Image src={darkmodBtn} alt="다크 모드 버튼" width={12} height={12} />
      </div>

      {/* 로고 및 네비게이션: 가운데 정렬 */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="mb-[10px] cursor-pointer">
          <Image src={logo} alt="티태 로고" width={87} height={34} />
        </div>

        <Button className="flex h-[46px] w-[180px] items-center justify-start gap-[10px] rounded-[15px] bg-[var(--background)] px-3 text-[var(--main-color-3)]">
          <Image
            src={selectaccount}
            alt="가계부선택될시"
            width={20}
            height={20}
          />
          가계부
        </Button>

        <Button className="flex h-[46px] w-[180px] items-center justify-start gap-[10px] rounded-[15px] px-3 text-[var(--gray-color-1)]">
          <Image src={godplaceicon} alt="갓플찾기" width={20} height={20} />
          갓플찾기
        </Button>

        <Button className="flex h-[46px] w-[180px] items-center justify-start gap-[10px] rounded-[15px] px-3 text-[var(--gray-color-1)]">
          <Image src={community} alt="커뮤니티" width={20} height={20} />
          커뮤니티
        </Button>

        <Button className="flex h-[46px] w-[180px] items-center justify-start gap-[10px] rounded-[15px] px-3 text-[var(--gray-color-1)]">
          <Image src={login} alt="로그인/회원가입" width={20} height={20} />
          로그인/회원가입
        </Button>
      </div>
      <div className="mt-auto flex flex-col items-center gap-2">
        <p className="cursor-pointer self-end text-[14px] text-[var(--white-color)]">
          1:1 문의하기
        </p>
        <div className="flex items-center gap-1">
          <Image src={github} alt="GitHub 아이콘" width={22} height={22} />
          <p className="text-[10px] text-[var(--main-color-2)]">
            © Code9ine All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
