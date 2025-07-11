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

export default function MobileMenu({
  login,
  loginSet,
  closeSideBar,
}: {
  login: boolean;
  loginSet: (arg0: boolean) => void;
  closeSideBar: (arg0: boolean) => void;
}) {
  const handleLogin = () => {
    loginSet(!login);
    closeSideBar(false);
  };
  return (
    <>
      <div>
        <div className="flex min-h-[94vh] w-[200px] flex-col items-center bg-[var(--header-color)]">
          {!login ? (
            <div className="mt-[30px] block">
              <Link href={'/accountbook'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Button className="pc-header-button" onClick={handleLogin}>
                <BsPersonRaisedHand size={20} />
                로그인/회원가입
              </Button>
            </div>
          ) : (
            <div className="mt-[30px] block">
              <Link href={'/accountbook'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Link href={'/profile'}>
                <Button
                  className="pc-header-button"
                  onClick={() => closeSideBar(false)}
                >
                  <IoPersonCircleOutline size={20} />
                  마이페이지
                </Button>
              </Link>

              <Button className="pc-header-button" onClick={handleLogin}>
                <IoMdPower size={20} />
                로그아웃
              </Button>
            </div>
          )}
          <div className="mt-auto flex-col items-center gap-2 md:flex">
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
