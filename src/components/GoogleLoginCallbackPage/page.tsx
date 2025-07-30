'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export default function GoogleLoginCallbackPage() {
  const router = useRouter();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      setIsLogin(true);
      toast.success('구글 로그인 완료!');
      router.push('/');
    } else {
      toast.error('로그인에 실패했습니다.');
      router.push('/login');
    }
  }, [router, setIsLogin]);

  return <p className="text-center">로그인 처리 중...</p>;
}
