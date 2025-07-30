'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { setTokens } from '@/services/authService'; // <-- API 함수 import

export default function GoogleLoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const expiresIn = Number(searchParams.get('expires_in'));
    const refreshExpiresIn = 28800;
    const role = searchParams.get('role') || 'ROLE_USER';

    if (accessToken && refreshToken) {
      setTokens({
        accessToken,
        refreshToken,
        expiresIn,
        refreshExpiresIn,
        role,
      })
        .then(() => {
          setIsLogin(true);
          toast.success('구글 로그인 완료!');
          router.push('/');
        })
        .catch((err) => {
          console.error(err);
          toast.error('토큰 설정 실패');
          router.push('/login');
        });
    } else {
      toast.error('로그인에 실패했습니다.');
      router.push('/login');
    }
  }, [searchParams, router, setIsLogin]);

  return <p className="text-center">로그인 처리 중...</p>;
}
