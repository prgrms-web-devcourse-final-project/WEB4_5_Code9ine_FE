'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export default function GoogleLoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=7200`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=28800`;

      setIsLogin(true);
      toast.success('구글 로그인 완료!');
      router.push('/');
    } else {
      toast.error('로그인에 실패했습니다.');
      router.push('/login');
    }
  }, [searchParams, router, setIsLogin]);

  return <p className="text-center">로그인 처리 중...</p>;
}
