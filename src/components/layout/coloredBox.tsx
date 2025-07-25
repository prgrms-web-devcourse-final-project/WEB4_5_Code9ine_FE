'use client';
import Image from 'next/image';
import logo from '@/assets/Logo.svg';
import Button from '../login/SignupButton';
import { LuNotebook } from 'react-icons/lu';
import {
  IoLogoGithub,
  IoMoonOutline,
  IoPersonCircleOutline,
  IoSearchSharp,
  IoSunnyOutline,
} from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { IoMdNotificationsOutline, IoMdPower } from 'react-icons/io';
import MobileMenu from '../common/MobileMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import NotificationBox from '../common/NotificationBox';
import {
  getNotificationTitles,
  getLikeNotifications,
  getCommentNotifications,
} from '@/api/notification';
import type { NotificationTitle } from '@/api/notification';
import { useAccountData } from '@/stores/accountStore';
import { logout } from '@/services/authService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ColoredBox() {
  const [login, setLogin] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const sidebarRef = useRef(null);
  const location = usePathname();
  const { isLogin, setIsLogin } = useAccountData();
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationTitle[]>([]);
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  // 다크모드
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const dark = saved === 'dark';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // 챌린지알람
  useEffect(() => {
    getNotificationTitles()
      .then((titles) => setNotifications((prev) => [...prev, ...titles]))
      .catch((err) => console.error(err));
  }, []);

  // 좋아요알람
  useEffect(() => {
    getLikeNotifications()
      .then((titles) => setNotifications((prev) => [...prev, ...titles]))
      .catch((err) => console.error(err));
  }, []);

  // 댓글알람
  useEffect(() => {
    getCommentNotifications()
      .then((titles) => setNotifications((prev) => [...prev, ...titles]))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotification]);

  const goToLogin = () => {
    router.push('/login');
  };
  const handleSideBarLogin = (sign: boolean) => {
    setLogin(sign);
  };
  const sideBarClose = (close: boolean) => {
    setMenu(close);
  };

  useEffect(() => {
    setIsClient(true);
    setLogin(isLogin);
    const targetElement = sidebarRef.current;
    if (menu) {
      // 스크롤 잠금 (사이드바 자체는 스크롤 가능하도록 targetElement 전달)
      disableBodyScroll(targetElement!);
    }

    return () => {
      if (targetElement) {
        enableBodyScroll(targetElement);
      }
    };
  }, [menu, isLogin]);

  if (!isClient) return null;

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃 되었습니다.');
      setLogin(false);
      setIsLogin(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '로그아웃 실패';
      toast.error(msg);
    }
  };

  return (
    <div className="relative">
      <div className="relative flex w-full items-center justify-center bg-[var(--header-color)] p-[10px] md:h-[870px] md:w-[200px] md:flex-col md:rounded-[10px]">
        {/* 다크 모드 버튼: 오른쪽 위 */}
        <div
          className={`cursor-pointer items-center justify-center ${login ? `gap-[12px]` : ''} text-[var(--header-text)] md:flex md:self-end`}
          ref={sidebarRef}
        >
          <button onClick={toggle} className="cursor-pointer p-2">
            {isDark ? (
              <IoSunnyOutline size={18} />
            ) : (
              <IoMoonOutline size={18} />
            )}
          </button>
          <div className="absolute top-[18px] right-[20px] md:static md:top-[23px] md:flex">
            {login ? (
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="cursor-pointer"
              >
                <IoMdNotificationsOutline size={20} />
              </button>
            ) : null}

            {showNotification && (
              <div ref={notificationRef} className="absolute right-0 z-50">
                <NotificationBox
                  onClose={() => setShowNotification(false)}
                  notifications={notifications}
                />
              </div>
            )}
          </div>

          {/* <div className="absolute top-[12px] right-[12px] size-[5px] rounded-full bg-red-400"></div> */}
        </div>
        <button
          className="absolute left-[20px] cursor-pointer md:hidden"
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
        {/* 로고 및 네비게이션: 가운데 정렬 */}
        <div className="flex items-center justify-center md:mt-6 md:flex-col md:gap-3 md:space-x-0">
          <Link href={'/'}>
            <div className="mt-[5px] mb-[6px] flex h-[29px] w-[87px] cursor-pointer items-center justify-center gap-[13px] md:mb-[20px] md:h-[29px] md:w-[87px]">
              <Image src={logo} alt="티태 로고" />
              <span className="text-[#ffffff]">티태</span>
            </div>
          </Link>

          {!login ? (
            <div className="hidden gap-[10px] md:flex md:flex-col">
              <Link href={'/accountbook'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/accountbook' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/accountbook' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/godplaces' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/godplaces' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/board' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/board' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Button
                className={`pc-header-button text-[var(--header-text)]`}
                onClick={goToLogin}
              >
                <BsPersonRaisedHand size={20} />
                로그인/회원가입
              </Button>
            </div>
          ) : (
            <div className="hidden gap-[10px] md:flex md:flex-col">
              <Link href={'/accountbook'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/accountbook' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/accountbook' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <LuNotebook size={20} />
                  가계부
                </Button>
              </Link>

              <Link href={'/godplaces'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/godplaces' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/godplaces' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <IoSearchSharp size={20} />
                  갓플찾기
                </Button>
              </Link>

              <Link href={'/board'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/board' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/board' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <HiOutlineUserGroup size={20} />
                  커뮤니티
                </Button>
              </Link>

              <Link href={'/profile'}>
                <Button
                  className={`pc-header-button text-[var(--header-text)] ${location === '/profile' ? 'bg-[var(--header-button-active)]' : ''} ${location === '/profile' ? 'text-[var(--header-text-active)]' : ''}`}
                >
                  <IoPersonCircleOutline size={20} />
                  마이페이지
                </Button>
              </Link>

              <Button
                className="pc-header-button text-[var(--header-text)]"
                onClick={handleLogout}
              >
                <IoMdPower size={20} />
                로그아웃
              </Button>
            </div>
          )}
          {/* <button className="cursor-pointer text-[var(--white-color)] md:hidden border-1">
            <IoMdNotificationsOutline size={16} />
          </button> */}
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
        className={`fixed inset-0 z-40 mt-[60px] bg-black/50 transition-opacity duration-300 md:hidden ${menu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenu(false)}
      ></div>

      <div
        className={`absolute z-900 -translate-x-full transition-all duration-300 ${menu ? 'translate-x-0' : ''} md:hidden`}
      >
        <MobileMenu
          login={login}
          loginSet={handleSideBarLogin}
          closeSideBar={sideBarClose}
        />
      </div>
    </div>
  );
}
