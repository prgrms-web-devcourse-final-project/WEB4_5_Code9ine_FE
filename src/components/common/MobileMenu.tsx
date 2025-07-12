'use client';
import Link from 'next/link';
import Button from '../login/SignupButton';
import { LuNotebook } from 'react-icons/lu';
import {
  IoLogoGithub,
  IoPersonCircleOutline,
  IoSearchSharp,
} from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { IoMdPower } from 'react-icons/io';
import { usePathname } from 'next/navigation';

export default function MobileMenu({
  login,
  loginSet,
  closeSideBar,
}: {
  login: boolean;
  loginSet: (arg0: boolean) => void;
  closeSideBar: (arg0: boolean) => void;
}) {
  const location = usePathname();
  const handleLogin = () => {
    loginSet(!login);
    closeSideBar(false);
  };
  return (
    <>
      <div>
        <div className="flex min-h-[94vh] w-[200px] flex-col items-center bg-[var(--header-color)]">
          {!login ? (
            <div className="mt-[30px] flex flex-col gap-[10px]">
              <Link href={'/accountbook'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/accountbook' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/accountbook' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/godplaces' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/godplaces' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/board' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/board' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Button
                className={`pc-header-button text-[var(--header-text)]`}
                onClick={handleLogin}
              >
                <BsPersonRaisedHand size={20} />
                로그인/회원가입
              </Button>
            </div>
          ) : (
            <div className="mt-[30px] flex flex-col gap-[10px]">
              <Link href={'/accountbook'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/accountbook' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/accountbook' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/godplaces' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/godplaces' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/board' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/board' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Link href={'/profile'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/profile' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/profile' ? 'text-[var(--header-text-active)]' : ''}`}
                  onClick={() => closeSideBar(false)}
                >
                  <IoPersonCircleOutline size={20} />
                  마이페이지
                </Button>
              </Link>

              <Button
                className={`pc-header-button text-[var(--header-text)]`}
                onClick={handleLogin}
              >
                <IoMdPower size={20} />
                로그아웃
              </Button>
            </div>
          )}
          <div className="mt-auto flex-col items-center gap-2 text-end md:flex">
            <p className="cursor-pointer self-end text-[14px] text-[var(--header-text)]">
              1:1 문의하기
            </p>
            <div className="flex items-end justify-center gap-1 pb-[10px] text-[var(--main-color-2)]">
              <IoLogoGithub size={22} />
              <p className="text-[10px]">© Code9ine All Right Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
